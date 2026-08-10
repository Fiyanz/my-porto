from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class LearningBase(BaseModel):
    title: str
    description: Optional[str] = None
    progress: Optional[int] = 0
    display_order: Optional[int] = 0

class LearningCreate(LearningBase):
    pass

class LearningUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    progress: Optional[int] = None
    display_order: Optional[int] = None

class LearningResponse(LearningBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
