from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.db.session import get_db
from app.models.contact import Contact
from app.schemas.contact import ContactResponse, ContactCreate

router = APIRouter()

@router.post("/", response_model=ContactResponse)
def create_contact(contact_in: ContactCreate, db: Session = Depends(get_db)):
    contact = Contact(**contact_in.model_dump())
    db.add(contact)
    db.commit()
    db.refresh(contact)
    return contact

@router.get("/", response_model=List[ContactResponse])
def read_contacts(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    contacts = db.query(Contact).order_by(Contact.created_at.desc()).offset(skip).limit(limit).all()
    return contacts
