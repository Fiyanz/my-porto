from sqlalchemy import Column, Integer, String, Text, DateTime, JSON, Boolean
from sqlalchemy.sql import func
from app.db.base import Base

class Experience(Base):
    __tablename__ = "experiences"
    
    id = Column(Integer, primary_key=True, index=True)
    type = Column(String, nullable=False)  # education, bootcamp, program, oss, milestone
    title = Column(String, nullable=False)
    institution = Column(String, nullable=False)
    location = Column(String, nullable=True)
    time_range = Column(String, nullable=False)  # e.g., "2022 – Present"
    status = Column(String, nullable=False, default="Completed")  # Current, Completed, Ongoing
    description = Column(Text, nullable=False)
    outcome = Column(String, nullable=True)
    tags = Column(JSON, default=[])  # e.g., ["TensorFlow", "Pandas"]
    icon = Column(String, nullable=True)  # FontAwesome class
    icon_bg = Column(String, default="bg-gray-700")  # Tailwind bg class
    display_order = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
