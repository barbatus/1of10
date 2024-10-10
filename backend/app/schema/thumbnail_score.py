from pydantic import BaseModel, ConfigDict
from pydantic.alias_generators import to_camel
from typing import Optional

class ThumbnailScoreBase(BaseModel):
    user_prompt: str
    thumbnail_id: int

    model_config = ConfigDict(
        from_attributes=True,
        alias_generator=to_camel,
        populate_by_name=True
    )

class ThumbnailScore(ThumbnailScoreBase):
    id: int
    result_score: Optional[float] = None
    result_hint: Optional[str] = None


class ThumbnailScoreCreate(ThumbnailScoreBase):
    pass
