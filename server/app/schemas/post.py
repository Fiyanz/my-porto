from pydantic import BaseModel, ConfigDict
from typing import Optional
from datetime import datetime

class PostBase(BaseModel):
    title: str
    slug: str
    excerpt: Optional[str] = None
    content: str
    published: bool = False

class PostCreate(PostBase):
    pass

class PostUpdate(PostBase):
    title: Optional[str] = None
    slug: Optional[str] = None
    content: Optional[str] = None

class PostResponse(PostBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime]

    model_config = ConfigDict(from_attributes=True)
