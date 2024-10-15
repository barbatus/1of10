from app.crud.base import CRUDBase
from app.models.thumbnail import Thumbnail as SqlThumbnail
from app.schema.thumbnail import Thumbnail, ThumbnailCreate
from sqlalchemy.orm import Session


class CRUDThumbnail(CRUDBase[SqlThumbnail, Thumbnail, ThumbnailCreate, Thumbnail]):
    pass


thumbnail = CRUDThumbnail(SqlThumbnail)
