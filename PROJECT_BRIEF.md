# Project Brief: Personal Portfolio Web System

## 1. Project Overview
This project is a modern, responsive personal portfolio web system designed to showcase projects, skills, experience, and provide a direct contact channel. The architecture is a decoupled client-server model utilizing a Next.js frontend, a FastAPI backend, and a PostgreSQL database, all orchestrated within Docker containers and routed through Nginx.

## 2. Goals and Objectives
- **Professional Online Presence**: Create a centralized platform to showcase software engineering capabilities, projects, and active learning paths.
- **Modern Aesthetics**: Translate the provided raw HTML designs into a fully functional, component-based React architecture using Tailwind CSS, ensuring pixel-perfect fidelity.
- **High Performance**: Utilize server-side rendering (where applicable) via Next.js and a highly concurrent backend using FastAPI.
- **Scalable Architecture**: Implement a robust monorepo structure with decoupled services to facilitate future expansion (e.g., adding an admin dashboard or blog).

## 3. Technology Stack
- **Frontend**: Next.js 15 (App Router), React, Tailwind CSS, FontAwesome.
- **Backend**: FastAPI (Python), SQLAlchemy (ORM), Alembic (Migrations), uv (Package Manager).
- **Database**: PostgreSQL 15.
- **Infrastructure**: Docker, Docker Compose, Nginx (Reverse Proxy).

## 4. System Architecture
The application runs as a multi-container Docker environment:
- `nginx`: Acts as the gateway, mapping `localhost:8080` to the frontend (`/`) and the backend API (`/api/`).
- `frontend`: The Next.js application running on port `3001` internally.
- `server`: The FastAPI application running on port `8001` internally.
- `db`: The PostgreSQL database mapping to port `15432` on the host to prevent local port conflicts.

## 5. Folder Structure
The repository is structured as a monorepo to separate concerns while maintaining a unified development environment:

```text
portfolio/
├── .env                  # Global environment variables
├── docker-compose.yml    # Container orchestration
├── nginx/                # Reverse proxy configuration
│   └── nginx.conf
├── frontend/             # Next.js Application
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx         # Global layout (Sidebar, Topbar, Terminal)
│   │   │   ├── page.tsx           # Home page
│   │   │   ├── projects/          # Projects portfolio
│   │   │   ├── skills/            # Tech stack and proficiency
│   │   │   ├── experience/        # Timeline and org involvement
│   │   │   └── contact/           # Contact form and availability
│   │   └── components/
│   │       ├── Sidebar.tsx        # Dynamic navigation sidebar
│   │       ├── Topbar.tsx         # Mobile-responsive top navigation
│   │       └── KittyTerminal.tsx  # Interactive mock terminal UI
│   ├── package.json
│   └── Dockerfile
└── server/               # FastAPI Application
    ├── app/
    │   ├── main.py                # FastAPI application entrypoint
    │   ├── core/                  # Security and configuration
    │   ├── db/                    # Database connection and session
    │   ├── models/                # SQLAlchemy database models
    │   ├── schemas/               # Pydantic validation schemas
    │   └── routers/               # API endpoint definitions
    ├── alembic/                   # Database migration scripts
    ├── pyproject.toml             # Python dependencies (managed by uv)
    └── Dockerfile
```

## 6. Key Features
- **App Shell Layout**: A consistent layout wrapper featuring a fixed sidebar navigation and a dynamic content area that fits strictly to the viewport height (`h-screen`).
- **Interactive Terminal ("Kitty")**: A custom-built React component simulating a Linux terminal environment (`neofetch`, `projects`, `contact`, `sudo hire` commands) that persists across page navigations.
- **Dynamic Content Views**:
  - Grid vs. List views in the Projects section.
  - Interactive "Deep Dive" and "Quick View" toggles for project details.
  - Simulated form submission handling in the Contact section.
- **Database Integration**: Fully modeled backend ready to serve dynamic content (Projects, Posts, Contacts, Users) backed by PostgreSQL.

## 7. Future Roadmap
- **Phase 2: Admin Dashboard**: Implement JWT authentication to secure an `/admin` route in the frontend, allowing for CRUD operations on projects, skills, and blog posts via the FastAPI backend.
- **Phase 3: CMS Integration**: Connect the Next.js frontend to fetch live data from the FastAPI endpoints instead of utilizing static mock data.
- **Phase 4: Analytics & SEO**: Implement tracking and optimize meta tags for better search engine visibility.
