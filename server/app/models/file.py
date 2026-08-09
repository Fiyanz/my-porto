from sqlalchemy import Column, String, LargeBinary
from app.db.base import Base

class FileStorage(Base):
    __tablename__ = "files"
    
    id = Column(String, primary_key=True, index=True) # e.g., 'resume'
    filename = Column(String, nullable=False)
    content_type = Column(String, nullable=False)
    data = Column(LargeBinary, nullable=False)
