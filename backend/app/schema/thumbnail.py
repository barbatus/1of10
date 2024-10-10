
from pydantic import BaseModel
from pydantic.alias_generators import to_snake, to_camel

class ThumbnailBase(BaseModel):
    name: str
    content_type: str
    file_data: bytes

    class ConfigDict:
        from_attributes = True
        alias_generator = to_camel
        populate_by_name = True

class Thumbnail(ThumbnailBase):
    id: int

class ThumbnailCreate(ThumbnailBase):
    pass

class ThumbnailResponse(BaseModel):
    id: int
    downloadUrl: str

    class ConfigDict:
        alias_generator = to_snake
        populate_by_name = True
