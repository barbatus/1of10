from pydantic import BaseModel

class ThumbnailScore(BaseModel):
    id: int
    user_prompt: str
    result_score: float
    result_hint: str
