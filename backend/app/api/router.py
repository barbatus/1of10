from fastapi import APIRouter

from app.api.endpoints import thumbnail_score, thumbnail

router = APIRouter()
router.include_router(thumbnail_score.router)
router.include_router(thumbnail.router)
