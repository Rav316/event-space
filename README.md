<div align="center">

# Event Space

**Full-stack event management platform with microservice architecture**

[![Java](https://img.shields.io/badge/Java-21-ED8B00?logo=openjdk&logoColor=white)](https://openjdk.org/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.0.2-6DB33F?logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![Go](https://img.shields.io/badge/Go-1.22-00ADD8?logo=go&logoColor=white)](https://go.dev/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![React Native](https://img.shields.io/badge/React%20Native-0.81-61DAFB?logo=react&logoColor=black)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-54-000020?logo=expo&logoColor=white)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-18-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![RabbitMQ](https://img.shields.io/badge/RabbitMQ-3-FF6600?logo=rabbitmq&logoColor=white)](https://www.rabbitmq.com/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white)](https://docs.docker.com/compose/)
[![Prometheus](https://img.shields.io/badge/Prometheus-Monitoring-E6522C?logo=prometheus&logoColor=white)](https://prometheus.io/)
[![Grafana](https://img.shields.io/badge/Grafana-Dashboards-F46800?logo=grafana&logoColor=white)](https://grafana.com/)
[![Nginx](https://img.shields.io/badge/Nginx-1.25-009639?logo=nginx&logoColor=white)](https://nginx.org/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)

A university-oriented platform for creating, managing, and discovering campus events. Features a REST API backend, asynchronous email notification service, web application, and cross-platform mobile app — all wired together with message-driven architecture and full observability.

</div>

---

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Services](#services)
  - [Event Space API](#event-space-api)
  - [Email Notification Service](#email-notification-service)
  - [Placeholder Service](#placeholder-service)
  - [Nginx Static Service](#nginx-static-service)
- [Frontend Web Application](#frontend-web-application)
- [Frontend Mobile Application](#frontend-mobile-application)
- [Observability Stack](#observability-stack)
- [Database](#database)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Environment Variables](#environment-variables)
  - [Running with Docker Compose](#running-with-docker-compose)
  - [Running the Web App](#running-the-web-app)
  - [Running the Mobile App](#running-the-mobile-app)
- [API Reference](#api-reference)
- [Useful Links](#useful-links)

---

## Architecture Overview

```
┌────────────────────────────────────────────────────────────────────────────┐
│                              CLIENTS                                       │
│                                                                            │
│    ┌──────────────────┐          ┌──────────────────────────┐              │
│    │   Mobile App     │          │       Web App            │              │
│    │ React Native 0.81│          │  React 19 + Vite 7       │              │
│    │ Expo 54          │          │  TypeScript + Tailwind   │              │
│    └────────┬─────────┘          │  Nginx :3000 (Docker)    │              │
│             │                    └────────────┬─────────────┘              │
│             │                                 │                            │
└─────────────┼─────────────────────────────────┼────────────────────────────┘
              │          REST / JSON            │ reverse proxy
              └──────────────┬──────────────────┘
                             ▼
┌────────────────────────────────────────────────────────────────────────────┐
│                           BACKEND SERVICES                                 │
│                                                                            │
│  ┌──────────────────────────┐        ┌──────────────────────────────┐      │
│  │   Event Space API        │        │  Email Notification Service  │      │
│  │   Spring Boot 4 + Java 21│        │  Spring Boot 4 + Java 21     │      │
│  │   :8080                  │───────>│  :8082                       │      │
│  │                          │ Rabbit │                              │      │
│  │  • Auth (JWT)            │  MQ    │  • RabbitMQ Consumer         │      │
│  │  • Events CRUD           │        │  • Thymeleaf Templates       │      │
│  │  • Users & Profiles      │        │  • Gmail SMTP                │      │
│  │  • Spaces & Buildings    │        │                              │      │
│  │  • Reviews & Ratings     │        └──────────────────────────────┘      │
│  │  • Statistics            │                                              │
│  └────────────┬─────────────┘                                              │
│               │                                                            │
│               ▼                                                            │
│  ┌──────────────────────────┐        ┌──────────────────────────────┐      │
│  │   PostgreSQL 18          │        │  Nginx Static :90            │      │
│  │   :5433                  │        │  • Media file serving        │      │
│  │                          │        │  • Placeholder proxy         │      │
│  │  • 39 Liquibase          │        │  • 30-day cache              │      │
│  │    migrations            │        │                              │      │
│  │  • 11 entity tables      │        │  ┌────────────────────────┐  │      │
│  └──────────────────────────┘        │  │ Placeholder Service    │  │      │
│                                      │  │ Go 1.22 (SVG gen)      │  │      │
│                                      │  └────────────────────────┘  │      │
│                                      └──────────────────────────────┘      │
└────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────┐
│                          OBSERVABILITY                                     │
│                                                                            │
│  ┌────────────────┐   ┌────────────────┐   ┌──────────────┐   ┌─────────┐  │
│  │  Prometheus    │   │  Loki          │   │  Alloy       │   │ Grafana │  │
│  │  :9090         │   │  :3100         │   │  :12345      │   │  :3001  │  │
│  │  Metrics scrape│   │  Log           │   │  Log         │   │  Dash-  │  │
│  │  every 15s     │   │  aggregation   │   │  collector   │   │  boards │  │
│  └────────────────┘   └───────▲────────┘   └──────┬───────┘   └─────────┘  │
│                               └───────────────────┘                        │
│  ┌────────────────┐                                                        │
│  │  Tempo         │  ◄── OTLP (4317/4318) from Spring Boot services        │
│  │  :3200         │      (OpenTelemetry Java agent)                        │
│  │  Trace store   │                                                        │
│  └────────────────┘                                                        │
└────────────────────────────────────────────────────────────────────────────┘
```

### Message Flow

```
event-space-api  ──►  RabbitMQ  ──►  email-notification-service  ──►  Gmail SMTP  ──►  Users
                      exchange:                                        (Thymeleaf
                      event.notifications                               HTML emails)
                      routing-key:
                      event.created
```

Event publishing is asynchronous (`@Async`), so it never blocks the main request thread.

---

## Services

### Event Space API

> **Main backend service — REST API for the entire platform**

| | |
|---|---|
| **Language** | Java 21 (virtual threads enabled) |
| **Framework** | Spring Boot 4.0.2 |
| **Build** | Gradle 9.1 |
| **Port** | `8080` |

#### Key Features

- **Authentication & Authorization** — JWT-based with access tokens (15 min) and refresh tokens (30 days). Method-level security via `@PreAuthorize`. BCrypt password hashing.
- **Event Management** — Full CRUD for events with categories, tags, steps/program, image uploads (up to 10MB processed via ImageMagick), and QR code information.
- **User Management** — Registration, profiles with social links (Telegram, VK, GitHub), faculty and course information.
- **Spaces & Buildings** — Venue management with space types, capacity, and building associations.
- **Reviews & Ratings** — 1-5 star rating system with helpful marks on reviews.
- **Statistics** — System-wide analytics and reporting endpoints.
- **Pagination** — Both offset-based (`PageResponse<T>`) and cursor-based (`SliceResponse<T>`).
- **File Uploads** — Image processing via ImageMagick, served through Nginx.

#### Tech Stack

| Category | Libraries |
|---|---|
| ORM | Hibernate 7.2.2, Spring Data JPA, QueryDSL 7.0 |
| Mapping | MapStruct 1.6.3 (~30 mappers) |
| Caching | Caffeine 3.2.2, Spring Cache |
| API Docs | SpringDoc OpenAPI 3.0.1 |
| Query Optimization | Hypersistence Utils 3.15.1 |
| Metrics | Micrometer + Prometheus |
| Logging | Logback + logstash-logback-encoder 9.0 (JSON to file, collected by Alloy) |
| Messaging | Spring AMQP (RabbitMQ) |
| Serialization | Jackson Databind 3.0.4 |

#### Backend Architecture

```
Controller Layer     ──►  Service Layer     ──►  Repository Layer  ──►  Database
(REST endpoints)          (Business logic)       (Spring Data JPA)      (PostgreSQL)
        │                       │
        ▼                       ▼
   DTO Variants            MapStruct Mappers
   (Create, Edit,          (~30 mapper interfaces)
    Read, List)
```

---

### Email Notification Service

> **Asynchronous email delivery via RabbitMQ**

| | |
|---|---|
| **Language** | Java 21 (virtual threads enabled) |
| **Framework** | Spring Boot 4.0.2 |
| **Port** | `8082` |
| **Queue** | `event.notifications.new-events` |

#### How It Works

1. When a new event is created, `event-space-api` publishes a message to RabbitMQ (exchange: `event.notifications`, routing key: `event.created`).
2. The email service consumes the message from the queue.
3. A Thymeleaf HTML template is rendered with event details.
4. The email is sent via Gmail SMTP to subscribed users.

Publishing is fully asynchronous and never blocks the API response.

#### Tech Stack

| Category | Libraries |
|---|---|
| Messaging | Spring AMQP (RabbitMQ consumer) |
| Email | Spring Mail, Gmail SMTP |
| Templates | Thymeleaf (HTML email rendering) |
| Metrics | Micrometer + Prometheus |
| Logging | Logback + logstash-logback-encoder 9.0 (JSON to file, collected by Alloy) |

---

### Placeholder Service

> **Lightweight SVG placeholder image generator**

| | |
|---|---|
| **Language** | Go 1.22 |
| **Port** | Internal (not exposed externally) |

Generates dynamic SVG placeholder images on the fly. Used when events or entities don't have an uploaded image.

#### Endpoint

```
GET /placeholder/?w=300&h=300&text=Event
```

| Parameter | Default | Description |
|---|---|---|
| `w` | `300` | Width in pixels |
| `h` | `300` | Height in pixels |
| `text` | `Placeholder` | Text to display |

Returns `image/svg+xml` with a gray background (`#DDDDDD`) and centered text.

---

### Nginx Static Service

> **Media file server and reverse proxy with aggressive caching**

| | |
|---|---|
| **Image** | `nginx:1.25-alpine` |
| **Port** | `90` |

#### Endpoints

| Path | Description |
|---|---|
| `/media/*` | Serves uploaded media files with 30-day cache (`Cache-Control: public, max-age=31536000, immutable`) |
| `/placeholder/*` | Proxies to the Go placeholder service with response caching (100MB cache, 30-day retention) |

---

## Frontend Web Application

> **Modern SPA built with React 19 and Vite 7**

| | |
|---|---|
| **Framework** | React 19.1 + TypeScript 5.8 |
| **Bundler** | Vite 7.1 |
| **Styling** | Tailwind CSS 4 |
| **Port** | `3000` (dev server) |

#### Key Libraries

| Category | Libraries |
|---|---|
| UI Components | Radix UI primitives, Lucide Icons, Shadcn/ui |
| State Management | Zustand 5 + Immer |
| Server State | TanStack React Query 5 |
| Forms | React Hook Form 7 + Zod 4 |
| Routing | React Router 7 |
| Animations | Motion 12, Canvas Confetti |
| Charts | Recharts 3 |
| Dates | date-fns 4, react-day-picker 9 |
| QR Codes | qrcode.react 4 |
| Theming | next-themes 0.4 |
| Toasts | Sonner 2 |

#### Pages

| Page | Route | Description |
|---|---|---|
| Main | `/` | Landing page with hero, popular events, top organizers, calendar |
| Events | `/events` | Browse all events with filters, search, sorting, and pagination |
| Event Detail | `/events/:id` | Full event info, program, reviews, registration, QR & sharing |
| Create Event | `/events/create` | Multi-step event creation wizard (5 steps) |
| Edit Event | `/events/:id/edit` | Edit existing event details |
| My Events | `/my-events` | Events organized by the current user |
| My Registrations | `/my-registrations` | Events the user has registered for |
| Registration | `/registration` | New user registration (multi-step) |
| Profile | `/profile` | User profile with settings and password management |
| Statistics | `/statistics` | Platform analytics with charts and metrics |

#### Performance Optimizations

- **Code splitting** — Manual vendor chunks for React, React Router, React Query, Recharts, and Radix UI.
- **Lazy loading** — Pages loaded on demand with `React.lazy`.
- **Debounced search** — Prevents excessive API calls during typing.
- **Optimistic updates** — Instant UI feedback via React Query mutations.

#### Available Scripts

```bash
yarn dev        # Start development server on port 3000
yarn build      # TypeScript check + production build
yarn lint       # Run ESLint
yarn preview    # Preview the production build locally
```

---

## Frontend Mobile Application

> **Cross-platform mobile app with Expo and React Native**

| | |
|---|---|
| **Framework** | React Native 0.81 + Expo 54 |
| **Language** | TypeScript 5.9 |
| **Styling** | NativeWind 4 (Tailwind CSS for React Native) |
| **Platforms** | iOS, Android |
| **Bundle ID** | `ru.alex.eventspace` |

#### Key Libraries

| Category | Libraries |
|---|---|
| Navigation | Expo Router 6 (file-based), React Navigation 7 |
| UI | NativeWind, Lucide React Native, RN Primitives |
| State | Zustand 5 + Immer |
| Server State | TanStack React Query 5 |
| Forms | React Hook Form 7 + Zod 4 |
| Camera & QR | Vision Camera, rn-qr-generator, Expo Image Picker |
| Storage | React Native MMKV |
| Animations | Reanimated 4, Gesture Handler 2 |
| Haptics | Expo Haptics, Burnt (toast notifications) |
| HTTP | Axios 1.13 |

#### Available Scripts

```bash
yarn start      # Start Expo / Metro bundler
yarn android    # Run on Android emulator or device
yarn ios        # Run on iOS simulator or device
yarn web        # Run in browser (Expo Web)
yarn lint       # Run Expo linter
```

---

## Observability Stack

The platform includes a complete monitoring and logging pipeline, auto-configured via Docker Compose.

### Prometheus

> **Metrics collection and alerting**

| | |
|---|---|
| **Port** | `9090` |
| **Scrape interval** | Every 15 seconds |

Scrapes metrics from both Spring Boot services at `/api/actuator/prometheus` using basic authentication.

**Monitored targets:**
- `event-space-api:8080`
- `email-notification-service:8082`

### Grafana Alloy

> **Log collection and forwarding agent**

| | |
|---|---|
| **Port** | `12345` |
| **Config** | `services/observability/alloy/config.alloy` |

Collects structured JSON logs from Spring Boot services by reading log files directly (via shared Docker named volumes) and forwards them to Loki. Non-Spring containers (RabbitMQ, Nginx, etc.) are collected via the Docker socket.

**Pipeline for Spring Boot services:**
1. Reads `app.json` from each service's log volume
2. Parses the JSON produced by `LogstashEncoder`
3. Promotes `level` to an indexed Loki label; `logger`, `thread`, `userId` go to structured metadata
4. Drops entries without a `level` (e.g. raw SQL plain-text lines)
5. Replaces the raw JSON line with the human-readable `message`

### Loki

> **Centralized log aggregation**

| | |
|---|---|
| **Port** | `3100` |
| **Retention** | 14 days |
| **Schema** | v13 (TSDB) |
| **Storage** | Filesystem |

Receives structured logs from Alloy. Each Spring Boot log entry is indexed by `service` and `level` labels, enabling fast filtering in Grafana.

### Tempo

> **Distributed tracing backend**

| | |
|---|---|
| **Port (HTTP queries)** | `3200` |
| **OTLP gRPC** | `4317` |
| **OTLP HTTP** | `4318` |
| **Retention** | 48 hours |

Accepts OTLP traces from both Spring Boot services (instrumented at runtime via the OpenTelemetry Java agent v2.26.1, attached with `-javaagent:` in each service's Dockerfile) and serves them to Grafana through the Tempo datasource. The agent auto-instruments HTTP, JDBC/Hibernate, Spring AMQP and HTTP-client calls out of the box, so traces arrive with full DB-query and message-publish spans without any code changes.

Each log line produced by the Spring services carries the active `traceId` / `spanId` (the agent's Logback instrumentation populates MDC, Alloy surfaces both fields as Loki structured metadata), which Grafana uses to jump seamlessly between a Loki log line and the full trace in Tempo — and vice versa.

### Grafana

> **Visualization dashboards**

| | |
|---|---|
| **Port** | `3001` |
| **Default credentials** | `admin` / `admin` |

Comes pre-provisioned with:
- **Datasources**: Prometheus + Loki + Tempo (auto-configured, with trace ↔ log correlation)
- **Dashboards**: JVM Micrometer metrics, Spring Boot Observability, **Tempo · Distributed Traces**

### Logging Architecture

```
Spring Boot services
    │
    ├── Console Appender ──► stdout  (plain-text, colored, human-readable)
    │
    └── AsyncAppender
            └── RollingFileAppender ──► /app/logs/app.json  (structured JSON)
                                               │
                                        Docker named volume
                                               │
                                               ▼
                                        Grafana Alloy
                                          • parse JSON
                                          • label: level, service
                                          • metadata: logger, thread, userId
                                          • drop entries without level
                                               │
                                               ▼
                                          Loki :3100
                                               │
                                               ▼
                                        Grafana Dashboards
```

Log files rotate daily (max 50 MB per file, 7-day retention, 500 MB total cap).
MDC filter enriches every log entry with `userId` for request tracing.

---

## Database

| | |
|---|---|
| **Engine** | PostgreSQL 18 |
| **Port** | `5433` (host) → `5432` (container) |
| **Migrations** | Liquibase (39 SQL changesets, versions 1.0 – 3.0) |


---

## Getting Started

### Prerequisites

| Tool | Required | Purpose |
|---|---|---|
| [Docker](https://docs.docker.com/get-docker/) | Yes | Container runtime |
| [Docker Compose](https://docs.docker.com/compose/install/) | Yes | Service orchestration |
| [Node.js](https://nodejs.org/) (18+) | For frontend | JavaScript runtime |
| [Yarn](https://yarnpkg.com/) | For frontend | Package manager |
| [Expo CLI](https://docs.expo.dev/get-started/installation/) | For mobile | Mobile development toolkit |

### Environment Variables

Copy the template and fill in the required values:

```bash
cp .env.example .env
```

| Variable | Required | Default | Description |
|---|---|---|---|
| `POSTGRES_DB` | Yes | `event_space_db` | PostgreSQL database name |
| `POSTGRES_USER` | Yes | `postgres` | PostgreSQL username |
| `POSTGRES_PASSWORD` | Yes | — | PostgreSQL password |
| `STATIC_CONTENT_PATH` | Local API only | — | Absolute path to `services/nginx-static-service/storage` when running API outside Docker Compose |
| `JWT_ACCESS_SECRET` | Yes | — | Secret key for signing JWT access tokens (min. 32 chars, use a strong random value) |
| `JWT_REFRESH_SECRET` | Yes | — | Secret key for signing JWT refresh tokens (min. 32 chars, must differ from access secret) |
| `GMAIL_APP_PASSWORD` | Yes | — | Google [App Password](https://support.google.com/accounts/answer/185833) for SMTP |
| `GMAIL_USERNAME` | Yes | — | Gmail address used to send emails |
| `MAIL_FROM` | Yes | — | Sender address (usually same as `GMAIL_USERNAME`) |
| `WEBSITE_URL` | Yes | `http://localhost:3000` | Base URL of the web app, used in email links |
| `PROMETHEUS_USERNAME` | No | `prometheus` | Basic auth username for metrics endpoints |
| `PROMETHEUS_PASSWORD` | Yes | — | Basic auth password for metrics endpoints |
| `RABBITMQ_USERNAME` | No | `admin` | RabbitMQ management username |
| `RABBITMQ_PASSWORD` | Yes | — | RabbitMQ management password |

### Running with Docker Compose

Start all backend services and infrastructure with a single command:

```bash
docker compose up -d
```

This launches **7 core containers** (13 with the `observability` profile):

| Container | Service | Port | Profile |
|---|---|---|---|
| `event-space-db` | PostgreSQL 18 | `5433` | core |
| `event-space-api` | Spring Boot API | `8080` | core |
| `email-notification-service` | Email Service | `8082` | core |
| `event-space-app` | Web App (Nginx) | `3000` | core |
| `placeholder_service` | Go Placeholder | Internal | core |
| `my_static_server` | Nginx Static | `90` | core |
| `rabbitmq` | RabbitMQ | `5672` / `15672` | core |
| `postgres-exporter` | Postgres Exporter | `9187` | observability |
| `prometheus` | Prometheus | `9090` | observability |
| `grafana` | Grafana | `3001` | observability |
| `loki` | Loki | `3100` | observability |
| `alloy` | Grafana Alloy | `12345` | observability |
| `tempo` | Grafana Tempo | `3200` / `4317` / `4318` | observability |

To start with full observability stack:

```bash
docker compose --profile observability up -d
```

Database migrations are applied automatically via Liquibase on API startup. RabbitMQ includes a healthcheck — dependent services wait for it to be ready.

To view logs:

```bash
docker compose logs -f event-space-api          # API logs
docker compose logs -f email-notification-service # Email service logs
docker compose logs -f                            # All services
```

To stop everything:

```bash
docker compose down
```

To stop and remove all data (volumes):

```bash
docker compose down -v
```

### Running the Web App

The web application is included in Docker Compose and starts automatically with all other services:

```bash
docker compose up -d event-space-app
```

It serves the production build via Nginx at **http://localhost:3000**, with reverse proxy to the API (`/api/`), media files (`/media/`), and placeholder images (`/placeholder/`).

For local development with hot reload:

```bash
cd event-space-app
yarn install
yarn dev
```

The development server starts at **http://localhost:3000**.

### Running the Mobile App

```bash
cd event-space-mobile
yarn install
yarn start
```

Then press:
- `a` — open on Android emulator / device
- `i` — open on iOS simulator
- `w` — open in web browser

> **Note:** For iOS development, you need macOS with Xcode installed. For Android, you need Android Studio with an emulator configured or a physical device with USB debugging enabled.

---

## API Reference

### Authentication

The API uses JWT bearer tokens. Include the access token in the `Authorization` header:

```
Authorization: Bearer <access_token>
```

- **Access token** — valid for 15 minutes
- **Refresh token** — valid for 30 days, used to obtain new access tokens

Full interactive API documentation is available via **Swagger UI** after starting the backend.

---

## Useful Links

After starting all services:

| Resource | URL |
|---|---|
| Web Application | http://localhost:3000 |
| REST API | http://localhost:8080/api |
| Swagger UI | http://localhost:8080/api/docs/swagger |
| RabbitMQ Management | http://localhost:15672 |
| Grafana Dashboards | http://localhost:3001 |
| Prometheus | http://localhost:9090 |
| Tempo (trace API) | http://localhost:3200 |
| Nginx Static / Media | http://localhost:90/media |

---

## Security

| Feature | Implementation |
|---|---|
| Authentication | JWT (access + refresh tokens) |
| Password storage | BCrypt hashing |
| Authorization | `@PreAuthorize` method-level checks |
| CORS | Enabled for frontend origins |
| CSRF | Disabled (stateless API) |
| Metrics endpoint | Protected with HTTP Basic Auth (MONITORING role) |
| File uploads | Size-limited to 10MB, processed server-side |

---

## Docker Build Details

All services use multi-stage Docker builds for minimal image size.

**Spring Boot services (API & Email):**

```dockerfile
# Stage 1: Build with Gradle
FROM gradle:9.1-jdk21 AS builder
COPY build.gradle settings.gradle version.gradle ./
RUN gradle dependencies --no-daemon
COPY src src
RUN gradle bootJar --no-daemon

# Stage 2: Runtime
FROM eclipse-temurin:21-jdk
COPY --from=builder /app/build/libs/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
```

**Web application (Frontend):**

```dockerfile
# Stage 1: Build with Node.js
FROM node:22-alpine AS build
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

# Stage 2: Serve with Nginx
FROM nginx:1.25-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
```

The frontend Nginx config includes reverse proxy to backend services (`/api/` → API, `/media/` → static server, `/placeholder/` → placeholder service), gzip compression, security headers (`X-Frame-Options`, `X-Content-Type-Options`, `X-XSS-Protection`, `Referrer-Policy`), long-term asset caching, and SPA fallback routing.

The Go placeholder service uses a similar two-stage build (`golang:1.22-alpine` → `alpine:3.20`) producing a minimal binary image.

---

<div align="center">

Built with Java, Go, React, and React Native

</div>
