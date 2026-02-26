# Build Stage
FROM eclipse-temurin:24-jdk AS build
WORKDIR /home/gradle/src

# Copy dependency configuration files first for better caching
COPY apps/api/build.gradle apps/api/settings.gradle apps/api/gradlew ./
COPY apps/api/gradle gradle/

# Download dependencies (cached layer)
RUN --mount=type=cache,target=/root/.gradle \
    ./gradlew dependencies --no-daemon || true

# Copy source code
COPY apps/api/src src/

# Build the application
RUN --mount=type=cache,target=/root/.gradle \
    ./gradlew clean build --no-daemon --quiet

# Runtime Stage (JRE only)
FROM eclipse-temurin:24-jre
WORKDIR /app

RUN apt-get update \
  && apt-get install -y --no-install-recommends curl \
  && rm -rf /var/lib/apt/lists/*

# Copy the built jar from the build stage
COPY --from=build /home/gradle/src/build/libs/*.jar /app/app.jar

EXPOSE 8083

# JVM options (optional)
ENV JAVA_OPTS="-XX:MaxRAMPercentage=75"

# Use a shell form to expand JAVA_OPTS
CMD ["sh", "-c", "java $JAVA_OPTS -jar /app/app.jar"]
