FROM mcr.microsoft.com/playwright:v1.49.1

# Set the working directory
WORKDIR /workspace

# Copy workspace configuration files
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./

# Copy e2e package files
COPY apps/e2e/package.json ./apps/e2e/

# Install pnpm globally
RUN npm install --location=global --no-fund pnpm

# Install all workspace dependencies
RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

# Set working directory to e2e
WORKDIR /workspace/apps/e2e

# Copy the rest of the e2e project files
COPY apps/e2e/ .

# Environment variables
ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="$PATH:$PNPM_HOME"

# Default command
CMD ["sh", "run_tests.sh"]
