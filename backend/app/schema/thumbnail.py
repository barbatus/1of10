
from pydantic import BaseModel

class Thumbnail(BaseModel):
    id: int
    file_data: bytes

    class ConfigDict:
        from_attributes = True
