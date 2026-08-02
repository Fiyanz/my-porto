from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from datetime import datetime

class ProjectBase(BaseModel):
    title: str
    slug: str
    description: str
    content: Optional[str] = None
    icon: Optional[str] = None
    domains: List[str] = []
    technologies: List[str] = []
    github_url: Optional[str] = None
    live_url: Optional[str] = None

class ProjectCreate(ProjectBase):
    pass

class ProjectUpdate(ProjectBase):
    title: Optional[str] = None
    slug: Optional[str] = None
    description: Optional[str] = None

class ProjectResponse(ProjectBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime]

    model_config = ConfigDict(from_attributes=True)
