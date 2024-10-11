from app.crud.base import CRUDBase
from app.models.thumbnail_score import ThumbnailScore as SqlThumbnailScore
from app.schema.thumbnail_score import ThumbnailScore, ThumbnailScoreCreate, ThumbnailScoreUpdate

class CRUDThumbnailScore(CRUDBase[SqlThumbnailScore, ThumbnailScore, ThumbnailScoreCreate, ThumbnailScoreUpdate]):
    pass

thumbnail_score = CRUDThumbnailScore(SqlThumbnailScore)
