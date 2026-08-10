from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import desc

from app.db.session import get_db
from app.models.learning import Learning
from app.schemas.learning import LearningCreate, LearningUpdate, LearningResponse
from app.core.deps import get_current_user

router = APIRouter()

@router.get("/", response_model=List[LearningResponse])
def get_learnings(db: Session = Depends(get_db)):
    items = db.query(Learning).order_by(Learning.display_order, desc(Learning.id)).all()
    return items

@router.post("/", response_model=LearningResponse, status_code=status.HTTP_201_CREATED)
def create_learning(
    item_in: LearningCreate, 
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    item = Learning(**item_in.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item

@router.put("/{item_id}", response_model=LearningResponse)
def update_learning(
    item_id: int, 
    item_in: LearningUpdate, 
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    item = db.query(Learning).filter(Learning.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    
    update_data = item_in.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(item, key, value)
        
    db.add(item)
    db.commit()
    db.refresh(item)
    return item

@router.delete("/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_learning(
    item_id: int, 
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    item = db.query(Learning).filter(Learning.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    
    db.delete(item)
    db.commit()
    return None
