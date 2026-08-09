from fastapi import HTTPException, UploadFile
from sqlalchemy.orm import Session
from app.models.file import FileStorage

async def upload_file_to_db(db: Session, file_id: str, file: UploadFile):
    contents = await file.read()
    
    db_file = db.query(FileStorage).filter(FileStorage.id == file_id).first()
    if db_file:
        db_file.filename = file.filename
        db_file.content_type = file.content_type
        db_file.data = contents
    else:
        db_file = FileStorage(
            id=file_id,
            filename=file.filename,
            content_type=file.content_type,
            data=contents
        )
        db.add(db_file)
        
    db.commit()
    return {"message": "File uploaded successfully", "filename": file.filename}

def get_file_from_db(db: Session, file_id: str):
    db_file = db.query(FileStorage).filter(FileStorage.id == file_id).first()
    if not db_file:
        raise HTTPException(status_code=404, detail="File not found")
    
    return db_file
