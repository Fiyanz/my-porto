from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.project import Project
from app.schemas.project import ProjectCreate, ProjectUpdate
from app.services.github import fetch_repo_details

def get_projects(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Project).offset(skip).limit(limit).all()

def get_project(db: Session, slug: str):
    project = db.query(Project).filter(Project.slug == slug).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

async def create_project(db: Session, project_in: ProjectCreate):
    project_data = project_in.model_dump()
    
    if project_data.get("github_url"):
        repo_details = await fetch_repo_details(project_data["github_url"])
        if repo_details:
            if not project_data.get("title"):
                project_data["title"] = repo_details["title"]
            if not project_data.get("description"):
                project_data["description"] = repo_details["description"]
            if not project_data.get("technologies") and repo_details.get("language"):
                project_data["technologies"] = [repo_details["language"]]

    project = Project(**project_data)
    db.add(project)
    db.commit()
    db.refresh(project)
    return project

async def update_project(db: Session, slug: str, project_in: ProjectUpdate):
    project = get_project(db, slug)
        
    update_data = project_in.model_dump(exclude_unset=True)
    
    if update_data.get("github_url"):
        repo_details = await fetch_repo_details(update_data["github_url"])
        if repo_details:
            if not update_data.get("title") and not project.title:
                update_data["title"] = repo_details["title"]
            if not update_data.get("description") and not project.description:
                update_data["description"] = repo_details["description"]
            if not update_data.get("technologies") and not project.technologies and repo_details.get("language"):
                update_data["technologies"] = [repo_details["language"]]
                
    for field, value in update_data.items():
        setattr(project, field, value)
        
    db.add(project)
    db.commit()
    db.refresh(project)
    return project

def delete_project(db: Session, slug: str):
    project = get_project(db, slug)
    db.delete(project)
    db.commit()
    return {"message": "Project deleted successfully"}
