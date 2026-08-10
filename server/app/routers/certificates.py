from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import desc

from app.db.session import get_db
from app.models.certificate import Certificate
from app.schemas.certificate import CertificateCreate, CertificateUpdate, CertificateResponse
from app.core.deps import get_current_user

router = APIRouter()

@router.get("/", response_model=List[CertificateResponse])
def get_certificates(db: Session = Depends(get_db)):
    """Get all certificates, ordered by display_order then id."""
    certs = db.query(Certificate).order_by(Certificate.display_order, desc(Certificate.id)).all()
    return certs

@router.post("/", response_model=CertificateResponse, status_code=status.HTTP_201_CREATED)
def create_certificate(
    cert_in: CertificateCreate, 
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    cert = Certificate(**cert_in.model_dump())
    db.add(cert)
    db.commit()
    db.refresh(cert)
    return cert

@router.put("/{cert_id}", response_model=CertificateResponse)
def update_certificate(
    cert_id: int, 
    cert_in: CertificateUpdate, 
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    cert = db.query(Certificate).filter(Certificate.id == cert_id).first()
    if not cert:
        raise HTTPException(status_code=404, detail="Certificate not found")
    
    update_data = cert_in.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(cert, key, value)
        
    db.add(cert)
    db.commit()
    db.refresh(cert)
    return cert

@router.delete("/{cert_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_certificate(
    cert_id: int, 
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    cert = db.query(Certificate).filter(Certificate.id == cert_id).first()
    if not cert:
        raise HTTPException(status_code=404, detail="Certificate not found")
    
    db.delete(cert)
    db.commit()
    return None
