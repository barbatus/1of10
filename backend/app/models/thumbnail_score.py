from sqlalchemy import Column, Integer, Float, ForeignKey, Text

from app.models.base import ORMBase

class ThumbnailScore(ORMBase):
    id = Column(Integer, primary_key=True, index=True)
    thumbnail_id = Column(Integer, ForeignKey("thumbnail.id"), nullable=False, index=True)
    user_prompt = Column(Text(10000), nullable=True)
    score = Column(Float, nullable=True)
    result_hint = Column(Text(10000), nullable=True)
