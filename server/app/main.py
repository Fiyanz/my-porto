from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.routers import auth, projects, blog, contact, github, skills, experiences, admin, files

app = FastAPI(title=settings.PROJECT_NAME)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(projects.router, prefix="/projects", tags=["projects"])
app.include_router(blog.router, prefix="/blog", tags=["blog"])
app.include_router(contact.router, prefix="/contact", tags=["contact"])
app.include_router(github.router, prefix="/github", tags=["github"])
app.include_router(skills.router, prefix="/skills", tags=["skills"])
app.include_router(experiences.router, prefix="/experiences", tags=["experiences"])
app.include_router(admin.router, tags=["admin"])
app.include_router(files.router)

@app.get("/")
def root():
    return {"message": "API is running"}
