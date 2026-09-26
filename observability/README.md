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
| Backend          | Node.js + NestJS        |
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
* Restart count
* Last heartbeat

Example health states:

```text
🟢 HEALTHY    Operating normally
🟡 WARNING    Threshold exceeded
🔴 CRITICAL   Service unavailable / critical issue
⚪ UNKNOWN    No recent heartbeat
```

---

## 📁 Project Structure

```text
.
├── frontend/                # Dashboard
├── backend/                 # NestJS API
│   └── src/
│       ├── health/
│       ├── metrics/
│       ├── containers/
│       └── monitoring/
├── agent/                   # VPS monitoring agent
├── docker/
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── cd.yml
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

### Clone

```bash
git clone https://github.com/<org>/<repository>.git
cd <repository>
```

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
GET  /api/health
GET  /api/servers
GET  /api/servers/:id/metrics

GET  /api/containers
GET  /api/containers/:id
GET  /api/containers/:id/metrics

GET  /api/metrics/cpu
GET  /api/metrics/memory
GET  /api/metrics/disk

WS   /api/realtime
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

---

## 🔐 Security

Recommended production practices:

* HTTPS for all external traffic
* Environment-based secrets
* Authentication for dashboard/API access
* Firewall-restricted VPS
* No public Docker socket
* Least-privilege credentials
* Regular OS and Docker updates

---

## 🗺️ Roadmap

* [x] VPS monitoring
* [x] Docker monitoring
* [x] Dockerized deployment
* [x] PostgreSQL persistence
* [x] GitHub Actions CI/CD
* [ ] Real-time WebSocket metrics
* [ ] Authentication & RBAC
* [ ] Configurable alerts
* [ ] Email / webhook notifications
* [ ] Multi-VPS support
* [ ] Historical metric charts

---

## 🤝 Contributing

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Run tests and linting.
5. Open a Pull Request.

```bash
git checkout -b feature/my-feature
npm test
npm run lint
git commit -m "feat: add container monitoring"
git push origin feature/my-feature
```

## 📄 License

MIT License. See [`LICENSE`](LICENSE).

---

**Monitor infrastructure. Detect problems early. Keep services healthy.**
