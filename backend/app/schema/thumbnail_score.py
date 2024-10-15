from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field
from pydantic.alias_generators import to_camel
from typing import Optional


class ThumbnailScoreBase(BaseModel):
    user_prompt: str = Field(..., max_length=500)
    thumbnail_id: int

    model_config = ConfigDict(
        from_attributes=True, alias_generator=to_camel, populate_by_name=True
    )


class ThumbnailScore(ThumbnailScoreBase):
    id: int
    score: Optional[float] = None
    result_hint: Optional[str] = None
    created_date: datetime


class ThumbnailScoreCreate(ThumbnailScoreBase):
    pass


class ThumbnailScoreUpdate(BaseModel):
    score: Optional[float] = None
    result_hint: Optional[str] = None
