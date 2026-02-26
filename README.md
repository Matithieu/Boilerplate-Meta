# Boilerplate-Meta Project

This project is a collection of services and tools to manage company information. It includes several sub-projects, each with a specific role.

## Installation

1. Clone the repository:

   ```sh
    git clone https://github.com/Matithieu/Boilerplate-Meta.git
   ```

   Clone the other repos:

   ```
   ./devcli install
   ```

2. Configure the environment variables:
   Copy the file [`template.env`](./template.env) to [`.env`](./.env) and modify the values as needed.

3. Install the dependencies for end-to-end tests:
   ```sh
   cd e2e
   pnpm install
   ```

## Usage

### Start the services

To start the services in development mode:

```sh
./devcli.sh start dev
```

To start the services in production mode:

```sh
./devcli.sh start prod
```

### Other useful commands

- Stop the services:

  ```sh
  ./devcli.sh stop {dev|prod}
  ```

- Insert data into the database:

  ```sh
  ./devcli.sh insert_db {template}
  ```

- Install repositories or update them:

  ```sh
  ./devcli.sh install
  ```

- Remove Docker volumes:

  ```sh
  ./devcli.sh remove_volumes {dev|prod}
  ```

- Create an environment on all repositories:

  ```sh
  ./devcli.sh create_env
  ```

- Generate certificates (for development mode):

  ```sh
  ./devcli.sh generate_certificates
  ```

- Reload a service:

  ```sh
  ./devcli.sh reload {dev|prod} {service_name}
  ```

- Generate a new secret key:
  ```sh
  openssl rand -base64 32
  ```

## Configuration

### Nginx

The Nginx configuration file is located at [`config/nginx/nginx.conf`](./config/nginx/nginx.conf).

### End-to-end test environment

The configurations for end-to-end tests are located at [`e2e/src/config/config.config.ts`](./e2e/src/config/config.config.ts).

## Contribution

Contributions are welcome. Please submit a pull request for any changes.

## License

This project is licensed under .

```

```
