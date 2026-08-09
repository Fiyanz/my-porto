from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.db.session import get_db
from app.models.experience import Experience
from app.schemas.experience import ExperienceResponse, ExperienceCreate, ExperienceUpdate

router = APIRouter()

@router.get("/", response_model=List[ExperienceResponse])
def read_experiences(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    experiences = db.query(Experience).order_by(Experience.display_order).offset(skip).limit(limit).all()
    return experiences

@router.get("/{experience_id}", response_model=ExperienceResponse)
def read_experience(experience_id: int, db: Session = Depends(get_db)):
    experience = db.query(Experience).filter(Experience.id == experience_id).first()
    if not experience:
        raise HTTPException(status_code=404, detail="Experience not found")
    return experience

@router.post("/", response_model=ExperienceResponse)
def create_experience(exp_in: ExperienceCreate, db: Session = Depends(get_db)):
    experience = Experience(**exp_in.model_dump())
    db.add(experience)
    db.commit()
    db.refresh(experience)
    return experience

@router.put("/{experience_id}", response_model=ExperienceResponse)
def update_experience(experience_id: int, exp_in: ExperienceUpdate, db: Session = Depends(get_db)):
    experience = db.query(Experience).filter(Experience.id == experience_id).first()
    if not experience:
        raise HTTPException(status_code=404, detail="Experience not found")
    update_data = exp_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(experience, field, value)
    db.add(experience)
    db.commit()
    db.refresh(experience)
    return experience

@router.delete("/{experience_id}")
def delete_experience(experience_id: int, db: Session = Depends(get_db)):
    experience = db.query(Experience).filter(Experience.id == experience_id).first()
    if not experience:
        raise HTTPException(status_code=404, detail="Experience not found")
    db.delete(experience)
    db.commit()
    return {"message": "Experience deleted successfully"}
