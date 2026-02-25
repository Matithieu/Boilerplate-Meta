#!/bin/bash
#!/bin/zsh
# On bash run it with ./devcli.sh

# Color codes for styling
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# shellcheck disable=SC1091
source .env

# Function to display help
help() {
    echo -e "${GREEN}Usage:${NC} $0 COMMAND [ARGS]"
    echo -e ""
    echo -e "${GREEN}Commands:${NC}"
    echo -e "  start ENV             Start docker containers for the specified environment."
    echo -e "  stop ENV              Stop docker containers for the specified environment."
    echo -e "  remove_volumes ENV    Remove docker volumes for the specified environment."
    echo -e "  export_kc_volume      Export Keycloak volume to a tar.gz file."
    echo -e "  import_kc_volume      Import Keycloak volume from a tar.gz file."
    echo -e "  generate_passwords    Generate random passwords."
    echo -e "  generate_certificates  Generate SSL/TLS certificates."
    echo -e "  reload ENV SERVICE    Reload a specific service container."
    echo -e "  e2e_tests             Run the e2e."
    echo -e "  logs ENV              Save docker logs for the specified environment."
    echo -e "  help                  Display this help message."
    echo -e ""
    echo -e "${GREEN}Examples:${NC}"
    echo -e "  $0 start dev"
    echo -e "  $0 reload dev backend"
    echo -e ""
}

# Function to generate SSL/TLS certificates and convert to JKS
# Might need to run this script with sudo
generate_certificates() {
    # Variables
    KEYSTORE_PASSWORD="changeit"
    ALIAS="myalias"
    DAYS_VALID=365
    CONFIG_FILE="./config/certs/server.cnf"
    OUTPUT_DIR="./config/certs"
    GREEN='\033[0;32m'
    NC='\033[0m' # No Color

    # Crée le répertoire de sortie s'il n'existe pas
    mkdir -p $OUTPUT_DIR

    # Création du fichier de configuration OpenSSL
    cat >$CONFIG_FILE <<EOL
[ req ]
distinguished_name = req_distinguished_name
x509_extensions = v3_req
prompt = no

[ req_distinguished_name ]
C = FR
ST = State
L = Paris
O = matithieu
OU = OrganizationalUnit
CN = matithieu.com

[ v3_req ]
subjectAltName = @alt_names

[ alt_names ]
DNS.1 = matithieu.com
DNS.2 = www.matithieu.com
DNS.3 = keycloak
DNS.4 = localhost
EOL

    # Private Key And CSR
    openssl req -newkey rsa:2048 -nodes -keyout $OUTPUT_DIR/server.key -out $OUTPUT_DIR/server.csr -config $CONFIG_FILE

    # CSR -> CRT
    openssl x509 -req -days $DAYS_VALID -in $OUTPUT_DIR/server.csr -signkey $OUTPUT_DIR/server.key -out $OUTPUT_DIR/server.crt -extensions v3_req -extfile $CONFIG_FILE

    # Key -> PKCS12
    openssl pkcs12 -export -in $OUTPUT_DIR/server.crt -inkey $OUTPUT_DIR/server.key -out $OUTPUT_DIR/server.p12 -name $ALIAS -passout pass:$KEYSTORE_PASSWORD

    # PKCS12 -> JKS
    keytool -importkeystore -deststorepass $KEYSTORE_PASSWORD -destkeypass $KEYSTORE_PASSWORD -destkeystore $OUTPUT_DIR/keystore.jks -srckeystore $OUTPUT_DIR/server.p12 -srcstoretype PKCS12 -srcstorepass $KEYSTORE_PASSWORD -alias $ALIAS

    # Combine the CRT and KEY into a PEM file
    cat $OUTPUT_DIR/server.crt $OUTPUT_DIR/server.key >$OUTPUT_DIR/server.pem

    # Give the correct permissions to the files
    chmod 644 $OUTPUT_DIR/server.crt $OUTPUT_DIR/server.key $OUTPUT_DIR/server.pem $OUTPUT_DIR/server.p12

    echo -e "${GREEN}SSL/TLS certificates generated successfully!${NC}"
}


# Function to start docker containers
start() {
    if [ -z "$1" ]; then
        echo -e "${RED}No environment specified. Please use 'dev' or 'prod'.${NC}"
        exit 1
    fi

    echo "Starting docker containers..."
    if [ "$1" = "dev" ] || [ "$1" = "prod" ]; then
        BUILD_ARG=""
        if [ "$1" = "prod" ]; then
            echo -e "${YELLOW}Starting in production mode...${NC}"
            if [ -z "$API_IMAGE" ] || [ -z "$FRONTEND_IMAGE" ]; then
                echo -e "${RED}Error: API_IMAGE and FRONTEND_IMAGE must be set in .env for production mode.${NC}"
                exit 1
            fi
        else
            echo -e "${YELLOW}Starting in development mode...${NC}"
            BUILD_ARG="--build"
        fi

        if docker compose -f "docker-compose-$1.yml" up -d ${BUILD_ARG} --quiet-pull; then
            echo -e "${GREEN}Containers are up!${NC}"
        else
            echo -e "${RED}Failed to start docker containers.${NC}"
            exit 1
        fi
    fi
}

stop() {
    # Check if an environment is provided
    if [ -z "$1" ]; then
        echo -e "${RED}Error: No environment specified. Please use 'dev' or 'prod'.${NC}"
        exit 1
    fi

    ENVIRONMENT="$1"
    FORCE_CONFIRMATION="$2"

    # Handle "prod" environment with optional force argument
    # Useful for stopping the production environment during CI/CD
    if [ "$ENVIRONMENT" = "prod" ]; then
        if [ "$FORCE_CONFIRMATION" != "--force" ]; then
            read -r -p "$(echo -e "${RED}Are you sure you want to stop the production environment? (yes/no): ${NC}") " confirmation
            if [[ "$confirmation" != "yes" ]]; then
                echo -e "${RED}Operation aborted by the user.${NC}"
                exit 1
            fi
        else
            echo -e "${YELLOW}Force flag detected. Skipping confirmation prompt.${NC}"
        fi
    fi

    compose_file="docker-compose-$ENVIRONMENT.yml"

    # Stop the Docker containers
    echo "Stopping Docker containers for the '$ENVIRONMENT' environment..."
    if docker compose -f "$compose_file" down; then
        echo -e "${GREEN}Containers for '$ENVIRONMENT' environment are stopped successfully!${NC}"
    else
        echo -e "${RED}Error: Failed to stop Docker containers for '$ENVIRONMENT'.${NC}"
        exit 1
    fi
}

# Function to remove specified volumes
remove_volumes() {
    echo -e "${YELLOW}WARNING: You are about to remove specific Docker volumes for the $1 environment.${NC}"
    echo -e "${YELLOW}This action is irreversible, and the data stored in these volumes will be permanently lost.${NC}"
    echo
    echo -e "${YELLOW}The following volumes will be deleted:${NC}"
    
    # List of volumes to delete
    volumes_to_delete=(
        "boilerplate-meta_pgadmin_data"
        # "boilerplate-meta_postgres_data"
    )

    for volume in "${volumes_to_delete[@]}"; do
        echo -e "${YELLOW}  - $volume${NC}"
    done

    echo
    read -r -p "Are you sure you want to proceed? (yes/no): " confirmation

    if [[ "$confirmation" != "yes" ]]; then
        echo -e "${RED}Operation aborted by the user.${NC}"
        return
    fi

    echo "Removing specific volumes for $1 environment..."
    
    # Iterate over the list of volumes to delete
    for volume in "${volumes_to_delete[@]}"; do
        echo -e "${YELLOW}Attempting to remove volume: $volume${NC}"
        
        if docker volume rm "$volume"; then
            echo -e "${GREEN}Successfully removed $volume.${NC}"
        else
            echo -e "${RED}Failed to remove $volume or it may not exist.${NC}"
        fi
    done
}


export_kc_volume() {
    # Check if Docker volume exists
    VOLUME_NAME="boilerplate-meta_keycloak-db"
    BACKUP_DIR="./backups"
    BACKUP_FILE="$BACKUP_DIR/${VOLUME_NAME}_backup_$(date +'%Y%m%d%H%M%S').tar.gz"

    # Create backup directory if it doesn't exist
    mkdir -p "$BACKUP_DIR"

    # Check if volume exists
    if ! docker volume inspect "$VOLUME_NAME" > /dev/null 2>&1; then
        echo -e "${RED}Error: Volume '$VOLUME_NAME' does not exist.${NC}"
        return 1
    fi

    echo "Exporting volume '$VOLUME_NAME' to '$BACKUP_FILE'..."

    # Use a temporary container to create the backup
    if docker run --rm \
        -v "$VOLUME_NAME:/data" \
        -v "$(pwd)/$BACKUP_DIR:/backup" \
        busybox \
        tar czvf "/backup/$(basename "$BACKUP_FILE")" -C /data .; then
        echo -e "${GREEN}Volume '$VOLUME_NAME' has been successfully exported to '$BACKUP_FILE'.${NC}"
    else
        echo -e "${RED}Failed to export volume '$VOLUME_NAME'.${NC}"
        return 1
    fi
}


import_kc_volume() {
    # Define volume name and backup file paths
    VOLUME_NAME="boilerplate-meta_keycloak-db"
    BACKUP_DIR="./backups"
    BACKUP_FILE="$1"

    # Make sure the user wants to proceed
    echo -e "${YELLOW}WARNING: You are about to override the existing volume '$VOLUME_NAME'.${NC}"
    echo -e "${YELLOW}This action is irreversible, and the data stored in this volume will be permanently lost.${NC}"
    echo
    read -r -p "$(echo -e "${RED}Are you sure you want to proceed? (yes/no): ${NC}") " confirmation

    if [[ "$confirmation" != "yes" ]]; then
        echo -e "${RED}Operation aborted by the user.${NC}"
        return 1
    fi

    # Check if the backup file was provided
    if [ -z "$BACKUP_FILE" ]; then
        echo -e "${RED}Error: No backup file specified. Please provide the path to the backup file.${NC}"
        echo "Usage: import_kc_volume <path_to_backup_file>"
        return 1
    fi

    # Check if the backup file exists
    if [ ! -f "$BACKUP_FILE" ]; then
        echo -e "${RED}Error: Backup file '$BACKUP_FILE' does not exist.${NC}"
        return 1
    fi

    echo "Importing volume '$VOLUME_NAME' from backup file '$BACKUP_FILE'..."

    # Check if the volume exists, if not create it
    if ! docker volume inspect "$VOLUME_NAME" > /dev/null 2>&1; then
        echo "Volume '$VOLUME_NAME' does not exist. Creating it..."
        if ! docker volume create "$VOLUME_NAME"; then
            echo -e "${RED}Error: Failed to create volume '$VOLUME_NAME'.${NC}"
            return 1
        fi
    fi

    # Use a temporary container to restore the backup into the volume
    if docker run --rm \
        -v "$VOLUME_NAME:/data" \
        -v "$(pwd)/$BACKUP_DIR:/backup" \
        busybox \
        tar xzvf "/backup/$(basename "$BACKUP_FILE")" -C /data; then
        echo -e "${GREEN}Volume '$VOLUME_NAME' has been successfully restored from '$BACKUP_FILE'.${NC}"
    else
        echo -e "${RED}Failed to restore volume '$VOLUME_NAME' from '$BACKUP_FILE'.${NC}"
        return 1
    fi
}



# Function to generate random passwords
generate_passwords() {
    PASSWORD_LENGTH=16
    NUMBER_OF_PASSWORDS=$1  # Number of passwords to generate

    if [[ -z "$NUMBER_OF_PASSWORDS" || ! "$NUMBER_OF_PASSWORDS" =~ ^[0-9]+$ ]]; then
        echo -e "${GREEN}Usage: generate_passwords <number_of_passwords>${NC}"
        return 1
    fi

    for ((i = 1; i <= NUMBER_OF_PASSWORDS; i++)); do
        PASSWORD=$(openssl rand -base64 $PASSWORD_LENGTH)
        echo -e "${GREEN}Generated Password $i: ${NC}$PASSWORD"
    done
}

# Function to reload a specific service container
reload() {
    if [ -z "$1" ] || [ -z "$2" ]; then
        echo -e "${RED}No environment or service specified. Please use 'dev' or 'prod' and specify a service name.${NC}"
        exit 1
    fi

    ENV=$1
    SERVICE=$2

    echo "Building the Docker image for $SERVICE..."
    if docker compose -f "docker-compose-$ENV.yml" build "$SERVICE"; then
        echo -e "${GREEN}Docker image built successfully.${NC}"
    else
        echo -e "${RED}Failed to build Docker image.${NC}"
        exit 1
    fi

    echo "Starting a new instance of $SERVICE container with the updated image..."
    if docker compose -f "docker-compose-$ENV.yml" up -d --scale "$SERVICE"=2 --no-recreate; then
        echo -e "${GREEN}New instance of $SERVICE started successfully!${NC}"
    else
        echo -e "${RED}Failed to start a new instance of $SERVICE.${NC}"
        exit 1
    fi

    echo "Waiting for the new container to stabilize..."
    if [ "$ENV" = "prod" ]; then
        sleep 30
    else
        sleep 10
    fi

    echo "Stopping the old $SERVICE container..."
    if docker compose -f "docker-compose-$ENV.yml" up -d --scale "$SERVICE"=1; then
        echo -e "${GREEN}Old instance of $SERVICE stopped successfully.${NC}"
    else
        echo -e "${RED}Failed to stop the old instance of $SERVICE.${NC}"
        exit 1
    fi

    echo "Reload of $SERVICE completed with zero downtime!"
}


# Start the E2E test environment
run_end2end_tests() {
    docker build -f ./apps/e2e/Dockerfile -t e2e-tests .
    
    # Detect the docker-compose network name
    COMPOSE_PROJECT_NAME=$(basename "$(pwd)" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]//g')
    NETWORK_NAME="${COMPOSE_PROJECT_NAME}_default"
    
    # Check if network exists, if not use host network as fallback
    if docker network inspect "$NETWORK_NAME" >/dev/null 2>&1; then
        NETWORK_ARG="--network=$NETWORK_NAME"
    else
        echo -e "${YELLOW}Warning: Network $NETWORK_NAME not found, using host.docker.internal${NC}"
        NETWORK_ARG="--add-host=host.docker.internal:host-gateway"
    fi
    
    # Use BASE_URL from environment or default to http://traefik
    BASE_URL=${BASE_URL:-http://traefik}
    
    docker run \
            --rm \
            --ipc=host \
            $NETWORK_ARG \
            --env PW_RUN_HEADLESS="1" \
            --env CI="1" \
            --env BASE_URL="$BASE_URL" \
            e2e-tests
}


run_docker_logs() {    
    mkdir -p logs
    services=("postgres" "pgadmin4" "keycloak-db" "keycloak" "backend" "redis" "oauth2-proxy" "prometheus" "grafana" "traefik" "frontend")
    for service in "${services[@]}"; do
        if docker compose -f "docker-compose-$1.yml" logs "$service" &> "logs/${service}_$1.log"; then
            echo -e "${GREEN}Logs for $service in $1 environment saved to logs/${service}_$1.log${NC}"
        else
            echo -e "${RED}Failed to retrieve logs for $service in $1 environment.${NC}"
        fi
    done
}


# Parse command-line arguments
COMMAND="$1"
shift

case "$COMMAND" in
    start)
        ENV="$1"
        if [[ "$ENV" == "dev" || "$ENV" == "prod" ]]; then
            start "$ENV"
        else
            echo -e "${RED}Error: Environment not specified or invalid. Use 'dev' or 'prod'.${NC}"
            help
            exit 1
        fi
        ;;
    stop)
        ENV="$1"
        FORCE="$2"

        if [[ "$ENV" == "dev" || "$ENV" == "prod" ]]; then
            if [[ "$FORCE" == "--force" ]]; then
                stop "$ENV" "$FORCE"
            else
                stop "$ENV"
            fi
        else
            echo -e "${RED}Error: Environment not specified or invalid. Use 'dev' or 'prod'.${NC}"
            help
            exit 1
        fi
        ;;
    remove_volumes)
        ENV="$1"
        if [[ "$ENV" == "dev" || "$ENV" == "prod" ]]; then
            remove_volumes "$ENV"
        else
            echo -e "${RED}Error: Environment not specified or invalid. Use 'dev' or 'prod'.${NC}"
            help
            exit 1
        fi
        ;;
    export_kc_volume)
        export_kc_volume
        ;;
    import_kc_volume)
        import_kc_volume "$@"
        ;;
    generate_passwords)
        generate_passwords "$@"
        ;;
    generate_certificates)
        generate_certificates
        ;;
    reload)
        ENV="$1"
        SERVICE="$2"
        if [[ "$ENV" == "dev" || "$ENV" == "prod" ]]; then
            if [[ -n "$SERVICE" ]]; then
                reload "$ENV" "$SERVICE"
            else
                echo -e "${RED}Error: Service name not specified.${NC}"
                help
                exit 1
            fi
        else
            echo -e "${RED}Error: Environment not specified or invalid. Use 'dev' or 'prod'.${NC}"
            help
            exit 1
        fi
        ;;
    e2e_tests)
        run_end2end_tests
        ;;
    logs)
        ENV="$1"
        if [[ "$ENV" == "dev" || "$ENV" == "prod" ]]; then
            run_docker_logs "$ENV"
        else
            echo -e "${RED}Error: Environment not specified or invalid. Use 'dev' or 'prod'.${NC}"
            help
            exit 1
        fi
        ;;
    help)
        help
        ;;
    *)
        echo -e "${RED}Error: Invalid command.${NC}"
        help
        exit 1
        ;;
esac