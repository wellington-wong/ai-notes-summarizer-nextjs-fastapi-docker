FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

RUN apt update && apt install -y netcat-openbsd

COPY . .

CMD sh -c "until nc -z db 5432; do echo 'waiting for postgress...'; sleep 2; done; uvicorn app.main:app --host 0.0.0.0 --port 8000"