
from pydantic import BaseModel, ConfigDict, AliasGenerator
from pydantic.alias_generators import to_snake, to_camel
from typing import Optional

class ThumbnailBase(BaseModel):
    name: Optional[str]
    content_type: str
    file_data: bytes

    model_config = ConfigDict(
        from_attributes=True,
        alias_generator=to_camel,
        populate_by_name=True
    )

class Thumbnail(ThumbnailBase):
    id: int

class ThumbnailCreate(ThumbnailBase):
    pass

class ThumbnailResponse(BaseModel):
    id: int
    download_url: str

    model_config = ConfigDict(
        alias_generator=AliasGenerator(
            validation_alias=to_snake,
            serialization_alias=to_camel
        ),
    )
