from app.crud.base import CRUDBase
from app.models.thumbnail_score import ThumbnailScore as SqlThumbnailScore
from app.schema.thumbnail_score import ThumbnailScore, ThumbnailScoreCreate

class CRUDThumbnailScore(CRUDBase[SqlThumbnailScore, ThumbnailScore, ThumbnailScoreCreate, ThumbnailScore]):
    pass

thumbnail_score = CRUDThumbnailScore(SqlThumbnailScore)
