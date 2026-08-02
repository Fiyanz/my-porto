# Personal Portfolio

A modern, responsive personal portfolio web application built with **Next.js** (Frontend) and **FastAPI** (Backend). The system is fully containerized using Docker and orchestrated via Docker Compose, utilizing Nginx as a reverse proxy.

## Architecture

The project is structured as a monorepo with the following services:

- **Frontend (`/frontend`)**: Built with **Next.js 15 (App Router)** and styled using **Tailwind CSS**. It provides an interactive UI, including a simulated "Kitty" terminal.
- **Backend (`/server`)**: A robust REST API powered by **FastAPI (Python)** using `uv` as the package manager and **SQLAlchemy** for database ORM.
- **Database**: **PostgreSQL 15** for persistent storage.
- **Proxy (`/nginx`)**: **Nginx** acts as a reverse proxy, seamlessly routing traffic between the frontend and the backend API.

## Features

- **Responsive Design**: Matches screen height with internal scrollable areas.
- **Interactive Terminal**: An integrated simulated terminal UI in the frontend.
- **Dynamic Pages**: Including Home, Projects, Skills, Experience, and Contact pages matching modern UI/UX design.
- **Containerized Environment**: One command to spin up the entire stack locally.

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone git@github.com:Fiyanz/my-porto.git
   cd my-porto
   ```

2. **Environment Variables:**
   Copy the example environment file and adjust the values if needed:
   ```bash
   cp .env.example .env
   ```

3. **Start the application:**
   Use Docker Compose to build and start all the services:
   ```bash
   docker-compose up --build -d
   ```

### Accessing the Services

Once the containers are up and running, you can access the services at the following URLs:

- **Main Application (Nginx Proxy)**: [http://localhost:8080](http://localhost:8080) 
  *(This is the primary entry point. Frontend is served at `/` and API routes at `/api/`)*
- **Frontend (Direct)**: [http://localhost:3001](http://localhost:3001)
- **Backend API (Direct)**: [http://localhost:8001](http://localhost:8001)
- **API Documentation (Swagger UI)**: [http://localhost:8001/docs](http://localhost:8001/docs)

### Database Access

The PostgreSQL database is mapped to host port `15432` to avoid conflicts with local database installations. 
- **Host**: `localhost`
- **Port**: `15432`
- **User**: `postgres` (or value in `.env`)
- **Password**: `postgres` (or value in `.env`)
- **Database**: `portfolio` (or value in `.env`)

## Development

### Frontend
To develop the frontend locally (without Docker):
```bash
cd frontend
npm install
npm run dev
```

### Backend
To develop the backend locally (without Docker):
```bash
cd server
uv venv
source .venv/bin/activate
uv pip install -r pyproject.toml
uv run uvicorn app.main:app --reload
```

## License

This project is open-source and available under the MIT License.
