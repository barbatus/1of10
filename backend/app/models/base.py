from typing import Any, Optional
from datetime import datetime, timezone

from sqlalchemy import Column, DateTime
from sqlalchemy.ext.declarative import as_declarative, declared_attr

class_registry: dict = {}

def datetime_utcnow():
    return datetime.now(timezone.utc)

@as_declarative(class_registry=class_registry)
class ORMBase:
    id: Any
    created_date = Column(DateTime, default=datetime_utcnow, index=True)
    updated_at = Column(DateTime(timezone=True), onupdate=datetime_utcnow, index=True)
    __name__: str

    @declared_attr
    def __tablename__(cls) -> str:
        return cls.__name__.lower()
