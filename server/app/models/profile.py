from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func
from app.db.base import Base

class Profile(Base):
    __tablename__ = "profiles"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, default="Bagus Alfiyan")
    title = Column(String, nullable=False, default="CS Student · ML Engineer · Backend Dev")
    bio = Column(Text, nullable=True)
    avatar_url = Column(String, nullable=True)
    github_url = Column(String, nullable=True, default="https://github.com/Fiyanz")
    linkedin_url = Column(String, nullable=True)
    instagram_url = Column(String, nullable=True)
    email = Column(String, nullable=True, default="bagus@example.com")
    location = Column(String, nullable=True, default="Bandung, Indonesia")
    status = Column(String, nullable=True, default="Available for Internship")
    cv_url = Column(String, nullable=True)
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
