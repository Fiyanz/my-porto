from pydantic import BaseModel, ConfigDict
from typing import Optional
from datetime import datetime

class ProfileBase(BaseModel):
    name: str = "Bagus Alfiyan"
    title: Optional[str] = None
    bio: Optional[str] = None
    avatar_url: Optional[str] = None
    github_url: Optional[str] = None
    linkedin_url: Optional[str] = None
    email: Optional[str] = None
    location: Optional[str] = None
    status: Optional[str] = None

class ProfileUpdate(BaseModel):
    name: Optional[str] = None
    title: Optional[str] = None
    bio: Optional[str] = None
    avatar_url: Optional[str] = None
    github_url: Optional[str] = None
    linkedin_url: Optional[str] = None
    email: Optional[str] = None
    location: Optional[str] = None
    status: Optional[str] = None

class ProfileResponse(ProfileBase):
    id: int
    updated_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)
