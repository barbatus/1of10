from sqlalchemy import Column, Integer, String, LargeBinary
from app.models.base import ORMBase

class Thumbnail(ORMBase):
    id = Column(Integer, primary_key=True, index=True)
    file_data = Column(LargeBinary)
