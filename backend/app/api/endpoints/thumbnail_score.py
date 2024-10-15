from sqlalchemy.orm import Session
from fastapi import Depends

from app.api.endpoints.crud_api import CRUDRouter
from app.crud import thumbnail_score, thumbnail
from app.schema.thumbnail_score import ThumbnailScore, ThumbnailScoreCreate
from app.db import get_db

from app.groq import eval_thumbnail_score

router_name = "thumbnail-score"

router = CRUDRouter(router_name, thumbnail_score)


@router.post(f"/{router_name}/score")
def score(
    obj_in: ThumbnailScoreCreate, db: Session = Depends(get_db)
) -> ThumbnailScore:
    obj = thumbnail_score.create(db, obj_in=obj_in)
    bytes = thumbnail.get(db, obj.thumbnail_id).file_data

    (score, hint) = eval_thumbnail_score(obj.user_prompt, bytes)

    thumbnail_score.update(db, db_obj=obj, obj_in={"score": score, "result_hint": hint})

    return obj
