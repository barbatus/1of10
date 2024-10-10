
from sqlalchemy.orm import Session
from fastapi import UploadFile, File, Form, Depends, HTTPException
from fastapi.responses import Response

from app.api.endpoints.crud_api import CRUDRouter, crud_model_dependency
from app.crud import thumbnail
from app.db import get_db
from app.schema.thumbnail import ThumbnailCreate, ThumbnailResponse
from app.models.thumbnail import Thumbnail as SqlThumbnail

router = CRUDRouter("thumbnail", thumbnail)

@router.post("/thumbnails/upload")
def upload(
    file: UploadFile = File(...), 
    name: str = Form(...),
    db: Session = Depends(get_db)
) -> ThumbnailResponse:
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Invalid file type")

    obj = thumbnail.create(db, obj_in = { "name": name, "file_data": file.file.read(), "content_type": file.content_type })

    return { "id": obj.id, "downloadUrl": f"thumbnails/download/{obj.id}" }

@router.get("/thumbnails/download/{obj_id}")
def download(
    thumbnail: SqlThumbnail = Depends(crud_model_dependency(thumbnail))
):
    return Response(
        content=thumbnail.file_data,
        media_type=thumbnail.content_type,
        headers={"Content-Disposition": f"inline; filename={thumbnail.name}"}
    )
