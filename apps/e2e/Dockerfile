FROM mcr.microsoft.com/playwright:v1.49.1

# Set the working directory
WORKDIR /e2e

# Copy only the files needed for dependency installation
COPY package.json pnpm-lock.yaml ./

# Install pnpm globally and dependencies with cache mount
RUN npm install --location=global --no-fund pnpm

RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

# Copy the rest of the project files
COPY . .

# Environment variables
ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="$PATH:$PNPM_HOME"

# Default command
CMD ["sh", "run_tests.sh"]
