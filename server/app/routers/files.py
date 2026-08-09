from fastapi import APIRouter, Depends, UploadFile, File
from fastapi.responses import Response
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.core.deps import get_current_user
from app.services.file_service import upload_file_to_db, get_file_from_db

router = APIRouter(prefix="/files", tags=["files"])

@router.get("/{file_id}")
def get_file(file_id: str, db: Session = Depends(get_db)):
    db_file = get_file_from_db(db, file_id)
    headers = {
        "Content-Disposition": f'inline; filename="{db_file.filename}"'
    }
    return Response(content=db_file.data, media_type=db_file.content_type, headers=headers)

@router.post("/{file_id}")
async def upload_file(
    file_id: str, 
    file: UploadFile = File(...), 
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):
    return await upload_file_to_db(db, file_id, file)
