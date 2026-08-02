from sqlalchemy import Column, Integer, String, Text, DateTime, JSON
from sqlalchemy.sql import func
from app.db.base import Base

class Project(Base):
    __tablename__ = "projects"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True, nullable=False)
    slug = Column(String, unique=True, index=True, nullable=False)
    category = Column(String, nullable=False, default="Backend")
    status = Column(String, nullable=False, default="Completed")
    description = Column(String, nullable=False)
    content = Column(Text, nullable=True) # General markdown content if needed
    icon = Column(String, nullable=True) # FontAwesome class
    domains = Column(JSON, default=[]) # e.g., ["API", "BE"]
    technologies = Column(JSON, default=[]) # e.g., ["FastAPI", "PostgreSQL"]
    outcome = Column(String, nullable=True)
    challenge = Column(Text, nullable=True)
    learning = Column(Text, nullable=True)
    github_url = Column(String, nullable=True)
    live_url = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
