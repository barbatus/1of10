from app.crud.base import CRUDBase
from app.models.thumbnail import Thumbnail as SqlThumbnail
from app.schema.thumbnail import Thumbnail

class CRUDThumbnail(CRUDBase[SqlThumbnail, Thumbnail, Thumbnail, Thumbnail]):
    pass

thumbnail = CRUDThumbnail(SqlThumbnail)
