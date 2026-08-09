from pydantic import BaseModel, ConfigDict
from typing import Optional
from datetime import datetime

class SkillBase(BaseModel):
    category: str
    name: str
    level: int = 50
    icon: Optional[str] = None
    is_primary: bool = False
    display_order: int = 0

class SkillCreate(SkillBase):
    pass

class SkillUpdate(BaseModel):
    category: Optional[str] = None
    name: Optional[str] = None
    level: Optional[int] = None
    icon: Optional[str] = None
    is_primary: Optional[bool] = None
    display_order: Optional[int] = None

class SkillResponse(SkillBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime]

    model_config = ConfigDict(from_attributes=True)
