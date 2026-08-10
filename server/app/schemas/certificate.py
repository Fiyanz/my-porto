from pydantic import BaseModel, ConfigDict
from typing import Optional
from datetime import datetime

class CertificateBase(BaseModel):
    title: str
    issuer: str
    date: Optional[str] = None
    credential_url: Optional[str] = None
    icon: str = "fa-certificate"
    display_order: int = 0

class CertificateCreate(CertificateBase):
    pass

class CertificateUpdate(BaseModel):
    title: Optional[str] = None
    issuer: Optional[str] = None
    date: Optional[str] = None
    credential_url: Optional[str] = None
    icon: Optional[str] = None
    display_order: Optional[int] = None

class CertificateResponse(CertificateBase):
    id: int
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)
