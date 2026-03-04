# Boilerplate-Meta

A production-ready SaaS boilerplate monorepo with authentication, payments, AI chat, and monitoring out of the box.

## Architecture Overview

```
Boilerplate-Meta/
├── apps/
│   ├── api/          # Java 24 + Spring Boot 3.4 (Gradle)
│   ├── web/          # React 18 + TypeScript + Vite
│   └── e2e/          # Playwright end-to-end tests
├── config/
│   ├── nginx/        # Reverse proxy for the frontend
│   ├── traefik/      # Edge router (dev & prod configs)
│   ├── keycloak/     # Realm export & custom theme
│   ├── prometheus/   # Metrics scraping config
│   └── grafana/      # Dashboards & datasources
├── docker-compose.yml  # Production orchestration
├── dev.yml             # Development overrides
└── turbo.json          # Turborepo task pipeline
```

### How the monorepo works

The repo uses **Turborepo** + **pnpm workspaces** to orchestrate the frontend and e2e apps. The Java API lives under `apps/api/` but is **not** a pnpm workspace member — it has its own Gradle build system.

| Command | What it does |
|---------|-------------|
| `turbo run build` | Builds web (Vite) and e2e in dependency order |
| `turbo run dev` | Starts the web dev server (Vite on port 5173) |
| `cd apps/api && ./gradlew bootRun` | Starts the Spring Boot API (port 8083) |

### Tech stack

| Layer | Technology |
|-------|-----------|
| **Backend** | Java 24, Spring Boot 3.4, Spring AI, Spring Security (OAuth2) |
| **Frontend** | React 18, TypeScript, Vite, TailwindCSS, Emotion, Zustand, TanStack Query |
| **Auth** | Keycloak 25 (OIDC/OAuth2) + OAuth2 Proxy |
| **Payments** | Stripe (subscriptions, billing portal) |
| **AI/LLM** | Spring AI (OpenAI-compatible, defaults to Ollama locally) |
| **Database** | PostgreSQL 16 + Liquibase migrations |
| **Cache** | Redis |
| **Monitoring** | Prometheus + Grafana |
| **Edge Router** | Traefik (HTTPS via Let's Encrypt in prod) |
| **E2E Tests** | Playwright |
| **CI/CD** | GitHub Actions (build, test, Docker push) |

## Request flow

```
Client → Traefik (TLS) → OAuth2 Proxy (auth check)
                              │
                ┌─────────────┼─────────────┐
                ▼             ▼              ▼
           Nginx/Web      API (8083)    Keycloak
           (React SPA)    Spring Boot   (OIDC provider)
                              │
                      ┌───────┼───────┐
                      ▼       ▼       ▼
                  Postgres  Redis   Ollama/LLM
```

- **Traefik** terminates TLS and routes traffic based on path/host rules.
- **OAuth2 Proxy** validates the session cookie before forwarding to backend services.
- **Nginx** serves the built React SPA and redirects all routes to `index.html`.
- **Spring Boot API** handles business logic, talks to PostgreSQL, Redis, Stripe, and the LLM provider.

## Apps

### API (`apps/api/`)

Spring Boot REST API with the following modules:

- **User management** — CRUD synced with Keycloak
- **Stripe integration** — subscriptions, webhooks, billing portal
- **LLM chat** — streaming AI responses with conversation history (Spring AI)
- **Security** — JWT validation via Keycloak, role-based access

Database migrations are managed by Liquibase (`src/main/resources/db/changelog/`).

### Web (`apps/web/`)

React single-page application:

- **Pages**: Landing, AI Chat, Settings, Account, Purchasing, Legal, Error
- **State**: Zustand for global state, TanStack Query for server state
- **Routing**: React Router v7 with protected routes (post-login redirect to `/ui/ai`)
- **i18n**: react-intl with translation files
- **API types**: Auto-generated from the backend's OpenAPI spec via `openapi-typescript`

### E2E (`apps/e2e/`)

Playwright tests covering login flows and settings page interactions. Runs in CI via GitHub Actions.

## Getting started

1. **Clone the repository**

   ```sh
   git clone https://github.com/Matithieu/Boilerplate-Meta.git
   cd Boilerplate-Meta
   ```

2. **Set up environment variables**

   ```sh
   cp template.env .env
   # Edit .env with your values (Stripe keys, Keycloak secrets, etc.)
   ```

3. **Start infrastructure (dev mode)**

   ```sh
   docker compose -f docker-compose.yml -f dev.yml up -d
   ```

   This starts PostgreSQL, Keycloak, Redis, Traefik, Prometheus, and Grafana.

4. **Start the API**

   ```sh
   cd apps/api && ./gradlew bootRun
   ```

5. **Start the frontend**

   ```sh
   pnpm install
   pnpm dev
   ```

   The web app is available at `https://localhost:443` (through Traefik) or `http://localhost:5173` (direct Vite dev server).

## Docker services

| Service | Port | Description |
|---------|------|-------------|
| Traefik | 80, 443 | Edge router & TLS termination |
| Keycloak | 8080 | Identity provider |
| PostgreSQL | 5432 | Main database |
| Keycloak DB | 5433 | Keycloak's dedicated database |
| Redis | 6379 | Cache & sessions |
| OAuth2 Proxy | 4180 | Authentication proxy |
| Prometheus | 9090 | Metrics collection |
| Grafana | 3000 | Metrics dashboards |
| pgAdmin | — | Database admin (behind Traefik) |
| Backend | 8083 | Spring Boot API |
| Frontend | — | Nginx serving the React build (behind Traefik) |

## CI/CD

GitHub Actions workflows in `.github/workflows/`:

- **Main workflow** — detects changed apps, computes semantic version, dispatches to app-specific pipelines
- **API pipeline** — build → test → Docker image
- **Web pipeline** — build & lint
- **E2E pipeline** — run Playwright tests
- **Push images** — publish Docker images to the registry

Versioning: `MAJOR.MINOR.PATCH`. PRs get a patch + short SHA suffix. Merges to main bump the minor version.

## License

This project is licensed under [LICENSE](./LICENSE).
