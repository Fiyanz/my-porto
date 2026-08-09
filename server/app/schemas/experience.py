from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from datetime import datetime

class ExperienceBase(BaseModel):
    type: str
    title: str
    institution: str
    location: Optional[str] = None
    time_range: str
    status: str = "Completed"
    description: str
    outcome: Optional[str] = None
    tags: List[str] = []
    icon: Optional[str] = None
    icon_bg: str = "bg-gray-700"
    display_order: int = 0

class ExperienceCreate(ExperienceBase):
    pass

class ExperienceUpdate(BaseModel):
    type: Optional[str] = None
    title: Optional[str] = None
    institution: Optional[str] = None
    location: Optional[str] = None
    time_range: Optional[str] = None
    status: Optional[str] = None
    description: Optional[str] = None
    outcome: Optional[str] = None
    tags: Optional[List[str]] = None
    icon: Optional[str] = None
    icon_bg: Optional[str] = None
    display_order: Optional[int] = None

class ExperienceResponse(ExperienceBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime]

    model_config = ConfigDict(from_attributes=True)
