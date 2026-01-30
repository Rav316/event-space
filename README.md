# Event Space

Full-stack event management platform. Includes a REST API, email notification service, web application (React), and mobile application (React Native).

## Architecture

| Service | Technology | Port |
|---|---|---|
| event-space-api | Spring Boot 4, Java 21 | 8080 |
| email-notification-service | Spring Boot 4, Java 21 | 8081 |
| placeholder-service | Go 1.22 | internal |
| nginx-static | Nginx 1.25 | 90 |
| PostgreSQL | 18 | 5433 |
| RabbitMQ | 3 (management) | 5672 / 15672 |
| Prometheus | - | 9090 |
| Grafana | - | 3100 |

## Prerequisites

- Docker and Docker Compose
- Node.js (for frontend)
- Yarn

## Running backend and infrastructure

### 1. Environment variables

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `POSTGRES_DB` | Database name (e.g. `event_space_db`) |
| `POSTGRES_USER` | PostgreSQL user |
| `POSTGRES_PASSWORD` | PostgreSQL password |
| `STATIC_CONTENT_PATH` | Absolute path to `services/nginx-static-service/storage` directory |
| `GMAIL_APP_PASSWORD` | Google account [App Password](https://support.google.com/accounts/answer/185833) |
| `GMAIL_USERNAME` | Gmail address used to send emails |
| `MAIL_FROM` | Sender address (usually the same as `GMAIL_USERNAME`) |
| `PROMETHEUS_USERNAME` | Username for metrics basic auth (default `prometheus`) |
| `PROMETHEUS_PASSWORD` | Password for metrics basic auth |
| `RABBITMQ_USERNAME` | RabbitMQ username |
| `RABBITMQ_PASSWORD` | RabbitMQ password |

### 2. Start with Docker Compose

```bash
docker-compose up -d
```

This will start all backend services and infrastructure: PostgreSQL, RabbitMQ, Nginx, Prometheus, Grafana, and both Spring Boot applications.

Database migrations are applied automatically via Liquibase on `event-space-api` startup.

## Running the web application

```bash
cd event-space-app
yarn install
yarn dev
```

## Running the mobile application

```bash
cd event-space-mobile
yarn install
yarn start
```

Then select a platform: `a` for Android, `i` for iOS.

## Useful links (after startup)

- **API:** http://localhost:8080
- **Swagger UI:** http://localhost:8080/api/docs/swagger
- **RabbitMQ Management:** http://localhost:15672
- **Grafana:** http://localhost:3100
- **Prometheus:** http://localhost:9090

