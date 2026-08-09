from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.sql import func
from app.db.base import Base

class Skill(Base):
    __tablename__ = "skills"
    
    id = Column(Integer, primary_key=True, index=True)
    category = Column(String, nullable=False)  # e.g., "Languages", "ML / Data"
    name = Column(String, nullable=False)
    level = Column(Integer, default=50)  # 0-100 percentage
    icon = Column(String, nullable=True)  # FontAwesome class
    is_primary = Column(Boolean, default=False)  # "most used" highlight
    display_order = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
