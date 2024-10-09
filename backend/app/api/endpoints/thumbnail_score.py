from app.api.endpoints.crud_api import CRUDRouter
from app.crud import thumbnail_score

router = CRUDRouter('thumbnail-score', thumbnail_score)
