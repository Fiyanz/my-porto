from pydantic import BaseModel, ConfigDict, EmailStr
from datetime import datetime

class ContactBase(BaseModel):
    name: str
    email: EmailStr
    message: str

class ContactCreate(ContactBase):
    pass

class ContactResponse(ContactBase):
    id: int
    is_read: bool
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
