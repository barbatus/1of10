from app.api.endpoints.crud_api import CRUDRouter
from app.crud import thumbnail

router = CRUDRouter('thumbnail', thumbnail)
