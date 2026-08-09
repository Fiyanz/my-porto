# Stage 1: Build Frontend
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Stage 2: Build Backend & Setup Runtime
FROM python:3.11-slim

# Install Node.js & dependencies
RUN apt-get update && apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs libpq-dev build-essential && \
    rm -rf /var/lib/apt/lists/*

# Install uv for Python
RUN curl -LsSf https://astral.sh/uv/install.sh | env UV_INSTALL_DIR="/usr/local/bin" sh

WORKDIR /app

# Copy Backend and install dependencies
COPY server/ ./server/
RUN cd server && /usr/local/bin/uv sync

# Copy Frontend build from stage 1
COPY --from=frontend-builder /app/frontend ./frontend

# Copy start script
COPY start.sh ./
RUN chmod +x start.sh

# Environment variables
ENV BACKEND_URL=http://127.0.0.1:8000
# Render sets the PORT env variable automatically (default 10000)
ENV PORT=10000

# Expose port (Render only uses one port)
EXPOSE 10000

CMD ["./start.sh"]
