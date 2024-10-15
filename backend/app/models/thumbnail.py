from sqlalchemy import Column, Integer, String, LargeBinary
from sqlalchemy.dialects.mysql import MEDIUMBLOB

from app.models.base import ORMBase


class Thumbnail(ORMBase):
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    content_type = Column(String(100), nullable=False)
    file_data = Column(MEDIUMBLOB, nullable=False)
