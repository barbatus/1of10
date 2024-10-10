from datetime import datetime, timezone
from typing import Any, Generic, TypeVar, get_args

from pydantic import BaseModel
from sqlalchemy import inspect as sqlalchemy_inspect
from sqlalchemy.orm import Session, defer, Query

from app.models.base import ORMBase

ModelType = TypeVar("ModelType", bound=ORMBase)
ModelSchema = TypeVar("ModelSchema", bound=BaseModel)
CreateSchemaType = TypeVar("CreateSchemaType", bound=BaseModel)
UpdateSchemaType = TypeVar("UpdateSchemaType", bound=BaseModel)

class CRUDBase(Generic[ModelType, ModelSchema, CreateSchemaType, UpdateSchemaType]):
    def __init__(self, model: type[ModelType]):
        self.model = model

    def as_dataclass(self, obj: ModelType) -> ModelSchema:
        schema_model = self.get_schema_type()
        return schema_model.model_validate(obj)  # type: ignore[return-value]

    def get_many(self, db: Session, ids: list[str | int], *options: Any) -> list[ModelType]:
        query = db.query(self.model)

        if getattr(self.model, 'blob', False):
            query = query.options(defer('blob'))

        return query.filter(self.model.id.in_(ids)).options(*options).all()

    def get(self, db: Session, id: str | int, *options: Any) -> ModelType | None:
        return next(iter(self.get_many(db, [id], *options)), None)

    def scan(self, db: Session, *, skip: int = 0, limit: int = 100, query: Query | None = None) -> list[ModelType]:
        query = query or db.query(self.model)
        return query.offset(skip).limit(limit).all()

    def create(self, db: Session, *, obj_in: CreateSchemaType | dict, commit: bool = True) -> ModelType:
        if isinstance(obj_in, dict):
            obj_in_data = obj_in
        else:
            obj_in_data = obj_in.model_dump(mode='json')

        db_obj = self.model(**obj_in_data)
        db_obj.created_at = datetime.now(timezone.utc)
        db.add(db_obj)

        if commit:
            db.commit()
            db.refresh(db_obj)
            return db_obj
        else:
            db.flush()

        return db_obj

    def update(
            self,
            db: Session,
            *,
            db_obj: ModelType,
            obj_in: UpdateSchemaType | dict[str, Any],
            exclude: list[str] | None = None,
            commit: bool = True
    ) -> ModelType:
        exclude = exclude or []

        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.model_dump(mode='json', exclude_unset=True)

        for field_name in sqlalchemy_inspect(db_obj).dict:
            if field_name in exclude or field_name.startswith(('__')):
                continue

            if field_name in update_data:
                setattr(db_obj, field_name, update_data[field_name])

        db.add(db_obj)

        if commit:
            db.commit()
        else:
            db.flush()

        return db_obj

    overwrite = update

    def delete(self, db: Session, obj_id: Any, commit: bool = True) -> None:
        return self.delete_many(db, [obj_id], commit=commit)

    def create_or_update(
            self,
            db: Session,
            obj_in: UpdateSchemaType | CreateSchemaType,
            commit: bool = True
    ) -> ModelType:
        if hasattr(obj_in, "id"):
            if (existing_obj := self.get(db, obj_in.id)) is None:
                raise Exception(f'cannot update: object not found (id={obj_in.id})')

            res = self.update(db, db_obj=existing_obj, obj_in=obj_in, commit=commit)  # type: ignore[arg-type]
        else:
            res = self.create(db, obj_in=obj_in, commit=commit)  # type: ignore[arg-type]

        if commit:
            db.commit()

        return res

    @classmethod
    def _get_generic_type(cls, idx: int) -> type[ORMBase | BaseModel]:
        return get_args(cls.__orig_bases__[0])[idx]  # type: ignore[attr-defined]

    @classmethod
    def get_model_type(cls) -> type[ORMBase]:
        return cls._get_generic_type(0)

    @classmethod
    def get_schema_type(cls) -> type[BaseModel]:
        return cls._get_generic_type(1)

    @classmethod
    def get_create_schema_type(cls) -> type[BaseModel]:
        return cls._get_generic_type(2)

    @classmethod
    def get_update_schema_type(cls) -> type[BaseModel]:
        return cls._get_generic_type(3)

