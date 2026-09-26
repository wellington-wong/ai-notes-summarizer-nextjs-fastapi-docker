# VPS & Docker Monitoring Dashboard

A real-time infrastructure monitoring dashboard for tracking the **health, performance, and availability of VPS servers and Docker containers** from a single interface.

Built with **Vercel, Node.js/NestJS, PostgreSQL, Docker, and GitHub Actions**.

## ✨ Features

* 📊 **VPS monitoring** — CPU, memory, disk, network, uptime, and load
* 🐳 **Docker monitoring** — container status, health, CPU, memory, uptime, and restarts
* ⚡ **Real-time updates** — live infrastructure and container metrics
* ❤️ **Health monitoring** — VPS, Docker, container, and service health
* 📈 **Historical metrics** — store and visualize infrastructure data
* 🔐 **API & authentication-ready backend**
* 🐳 **Fully Dockerized**
* 🚀 **GitHub Actions CI/CD**
* ☁️ **Vercel frontend deployment**

---

## 🏗️ Architecture

```text
                         ┌─────────────────┐
                         │     Browser     │
                         │   Dashboard UI  │
                         └────────┬────────┘
                                  │
                                  ▼
                         ┌─────────────────┐
                         │     Vercel      │
                         │    Frontend     │
                         └────────┬────────┘
                                  │
                           REST / WebSocket
                                  │
                                  ▼
                         ┌─────────────────┐
                         │ Node.js/NestJS  │
                         │    Backend      │
                         └───────┬─┬───────┘
                                 │ │
                    ┌────────────┘ └────────────┐
                    ▼                           ▼
             ┌──────────────┐          ┌────────────────┐
             │  PostgreSQL  │          │ Monitoring     │
             │ Metrics/Data │          │ Agent          │
             └──────────────┘          └───────┬────────┘
                                               │
                                               ▼
                                      ┌────────────────┐
                                      │      VPS       │
                                      │ CPU/RAM/Disk   │
                                      │ Network/Uptime │
                                      └───────┬────────┘
                                              │
                                              ▼
                                      ┌────────────────┐
                                      │ Docker Engine  │
                                      │ ┌────┐ ┌────┐  │
                                      │ │ C1 │ │ C2 │  │
                                      │ └────┘ └────┘  │
                                      └────────────────┘
```

## 🧰 Tech Stack

| Layer            | Technology              |
| ---------------- | ----------------------- |
| Frontend         | Vercel                  |
| Observability    | Node.js + NestJS        |
| Database         | PostgreSQL              |
| Infrastructure   | VPS + Docker            |
| Containerization | Docker / Docker Compose |
| CI/CD            | GitHub Actions          |
| Communication    | REST + WebSocket        |

---

## 📈 Monitored Metrics

### VPS

* CPU utilization and load
* Memory usage
* Disk usage
* Network traffic
* System uptime
* Host availability

### Docker Containers

* Running / stopped state
* Health status
* CPU and memory usage
* Network statistics
* Container uptime
* Last heartbeat

---

## 📁 Project Structure

```text
.
├── frontend/                # Dashboard
├── observability/                 # NestJS API
│   └── src/
│       ├── health/
│       ├── metrics/
│       ├── containers/
│       └── monitoring/
├── .github/
│   └── workflows/
│       ├── deploy-observability.yml
├── docker-compose.yml
├── .env.example
└── README.md
```

---

## 🚀 Getting Started

### Requirements

* Node.js
* Docker & Docker Compose
* PostgreSQL
* Git

### Configure

```bash
cp .env.example .env
```

Example:

```env
NODE_ENV=development
PORT=3000

DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_NAME=monitoring
DATABASE_USER=postgres
DATABASE_PASSWORD=change-me

JWT_SECRET=change-me
MONITORING_INTERVAL=5000
```

> Never commit production secrets or credentials to Git.

---

## 🐳 Run with Docker

Start the complete environment:

```bash
docker compose up -d
```

View services:

```bash
docker compose ps
```

View logs:

```bash
docker compose logs -f
```

Stop:

```bash
docker compose down
```

---

## 🔌 API

Example endpoints:

```text
GET  /system/metrics
GET  /docker/containers/metrics
```

The monitoring agent collects VPS and Docker metrics, sends them to the NestJS backend, and the backend persists relevant data in PostgreSQL while streaming live updates to connected clients.

---

## 🔄 CI/CD

GitHub Actions automates testing, building, and deployment.

```text
Push / Pull Request
        │
        ▼
   Install & Lint
        │
        ▼
      Tests
        │
        ▼
      Build
        │
        ▼
 Docker Image Build
        │
        ▼
     Deploy
        │
        ▼
   Health Check
```

The frontend is deployed through **Vercel**, while the containerized backend and monitoring services can be deployed to the VPS.
