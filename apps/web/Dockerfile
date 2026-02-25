# Stage 1: Install dependencies
FROM node:18.20.4-alpine AS deps

# Install pnpm
RUN npm install -g pnpm

WORKDIR /app

# Copy dependency files only
COPY package.json pnpm-lock.yaml ./

# Install dependencies with cache mount
RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile --prod=false

# Stage 2: Build the application
FROM node:18.20.4-alpine AS build-stage

# Install pnpm
RUN npm install -g pnpm

WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY package.json pnpm-lock.yaml ./

# Copy source code
COPY . .

ENV NODE_ENV=production

# Build the application
RUN pnpm run build

# Stage 2: Serve the application from Nginx
FROM nginx:1.26.2-alpine

ARG CONFIG_PATH

COPY --from=build-stage /app/dist /usr/share/nginx/html/