from pydantic import BaseModel
from pydantic.alias_generators import to_camel

class ThumbnailScore(BaseModel):
    id: int
    user_prompt: str
    result_score: float
    result_hint: str

    class ConfigDict:
        from_attributes = True
        alias_generator = to_camel
        populate_by_name = True
