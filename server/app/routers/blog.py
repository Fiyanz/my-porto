from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.db.session import get_db
from app.models.post import Post
from app.schemas.post import PostResponse, PostCreate, PostUpdate

router = APIRouter()

@router.get("/", response_model=List[PostResponse])
def read_posts(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    posts = db.query(Post).filter(Post.published == True).offset(skip).limit(limit).all()
    return posts

@router.get("/{slug}", response_model=PostResponse)
def read_post(slug: str, db: Session = Depends(get_db)):
    post = db.query(Post).filter(Post.slug == slug, Post.published == True).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post

@router.post("/", response_model=PostResponse)
def create_post(post_in: PostCreate, db: Session = Depends(get_db)):
    post = Post(**post_in.model_dump())
    db.add(post)
    db.commit()
    db.refresh(post)
    return post
