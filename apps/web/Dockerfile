# Stage 1: Install dependencies
FROM node:20-alpine AS deps

# Install pnpm (pinned to match packageManager field in package.json)
RUN npm install -g pnpm@9

WORKDIR /app

# Copy workspace root files (context = monorepo root)
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Copy all workspace package.json files for dependency resolution
COPY apps/web/package.json ./apps/web/
COPY apps/e2e/package.json ./apps/e2e/

# Install dependencies with cache mount (skip lifecycle scripts - source not present yet)
RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile --ignore-scripts

# Stage 2: Build the application
FROM node:20-alpine AS build-stage

# Install pnpm (pinned to match packageManager field in package.json)
RUN npm install -g pnpm@9

WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY package.json pnpm-workspace.yaml ./

# Copy web app source
COPY apps/web/ ./apps/web/

ENV NODE_ENV=production

# Build the application
RUN pnpm -C apps/web run build

# Stage 3: Serve the application from Nginx
FROM nginx:1.26.2-alpine

ARG CONFIG_PATH

COPY --from=build-stage /app/apps/web/dist /usr/share/nginx/html/
