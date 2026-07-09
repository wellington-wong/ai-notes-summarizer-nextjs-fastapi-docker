# 📝 AI Notes Summarizer

An AI-powered web application that transforms lengthy notes into concise, easy-to-read summaries using the OpenAI API.

Built with a modern full-stack architecture featuring **Next.js**, **FastAPI**, and **PostgreSQL**, with separate frontend and backend deployments for scalability.

---

## ✨ Features

- 🤖 AI-powered note summarization using the OpenAI API
- 📝 Create and manage notes
- ⚡ Fast REST API built with FastAPI
- 💾 Persistent PostgreSQL database
- 🎨 Responsive Next.js frontend
- 🐳 Dockerized development and production environments
- ☁️ Frontend deployed on Vercel
- 🌐 Backend and PostgreSQL hosted on a DigitalOcean VPS

---

## 🏗️ Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- CSS

### Backend

- FastAPI
- SQLAlchemy
- Pydantic
- Uvicorn

### AI

- OpenAI API

### Database

- PostgreSQL

### DevOps

- Docker
- Docker Compose
- Vercel
- DigitalOcean Droplet (Ubuntu VPS)

---

## 📁 Project Structure

```text
.
├── backend
│   ├── app
│   │   ├── ai.py
│   │   ├── database.py
│   │   ├── main.py
│   │   ├── models.py
│   │   └── schemas.py
│   ├── Dockerfile
│   ├── requirements.txt
│   └── test
│
├── frontend
│   ├── src
│   │   └── app
│   │       ├── about
│   │       ├── services
│   │       └── types
│   ├── public
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml
├── docker-compose.prod.yml
└── README.md
```

---

## 🏛️ Architecture

```text
                 User
                   │
                   ▼
        Next.js Frontend (Vercel)
                   │
            REST API Requests
                   │
                   ▼
       FastAPI Backend (DigitalOcean)
           │                    │
           │                    │
           ▼                    ▼
     OpenAI API          PostgreSQL Database
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- Python 3.11+
- Docker
- Docker Compose
- PostgreSQL (optional if using Docker)
- OpenAI API Key

---

## Clone the Repository

```bash
git clone https://github.com/yourusername/ai-notes-summarizer.git

cd ai-notes-summarizer
```

---

## Environment Variables

### Backend

Create:

```text
backend/.env
```

Example:

```env
OPENAI_API_KEY=your_openai_api_key

DATABASE_URL=postgresql://postgres:password@db:5432/notesdb
```

### Frontend

Create:

```text
frontend/.env.local
```

Example:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## Running with Docker

Development

```bash
docker compose up --build
```

Production

```bash
docker compose -f docker-compose.prod.yml up --build -d
```

---

## Running Locally

### Backend

```bash
cd backend

pip install -r requirements.txt

uvicorn app.main:app --reload
```

Runs on

```
http://localhost:8000
```

---

### Frontend

```bash
cd frontend

npm install

npm run dev
```

Runs on

```
http://localhost:3000
```

---

## API Overview

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/notes` | Retrieve all notes |
| POST | `/notes` | Create a new note |
| GET | `/notes/{id}` | Retrieve a note |
| PUT | `/notes/{id}` | Update a note |
| DELETE | `/notes/{id}` | Delete a note |
| POST | `/summarize` | Generate AI summary |

---

## Deployment

### Frontend

- Hosted on **Vercel**
- Automatically deployed from GitHub

### Backend

Hosted on a **DigitalOcean Ubuntu Droplet**

Includes:

- FastAPI
- Docker
- Nginx (optional reverse proxy)
- SSL via Let's Encrypt (optional)

### Database

- PostgreSQL
- Hosted on the same DigitalOcean VPS
- Managed via Docker Compose

---

## Docker Services

Typical production stack:

```text
Frontend (Vercel)

↓

FastAPI Container

↓

PostgreSQL Container
```

---

## Future Improvements

- User authentication
- Note tagging
- Rich text editor
- AI chat assistant
- Streaming responses
- Export summaries as PDF
- Search functionality
- Note categories
- Markdown support
- Rate limiting
- Background task queue (Celery)

---

## License

This project is licensed under the MIT License.

---

## Author

**Your Name**

GitHub: https://github.com/yourusername

---

## Acknowledgements

- OpenAI
- FastAPI
- Next.js
- PostgreSQL
- Docker
- Vercel
- DigitalOcean