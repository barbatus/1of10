# mypy: disable-error-code = valid-type

from functools import wraps
from typing import Type, Optional, Callable, Any, Annotated, Generic, TypeVar

from fastapi import APIRouter, Depends, Query, Body, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from starlette import status

from app.crud.base import CRUDBase
from app.db import get_db
from app.models.base import ORMBase

ModelType = TypeVar("ModelType", bound=ORMBase)
ModelSchema = TypeVar("ModelSchema", bound=BaseModel)
CreateSchemaType = TypeVar("CreateSchemaType", bound=BaseModel)
UpdateSchemaType = TypeVar("UpdateSchemaType", bound=BaseModel)

def crud_model_dependency(crud_model: CRUDBase):
    def dependency(
            obj_id: int,
            db: Session = Depends(get_db)
    ):  # type: ignore[valid-type]
        if obj := crud_model.get(db=db, id=obj_id):
            return obj

        raise HTTPException(status.HTTP_404_NOT_FOUND)

    return dependency

class CRUDRouter(APIRouter, Generic[ModelType, ModelSchema, CreateSchemaType, UpdateSchemaType]):

    @wraps(APIRouter.__init__)
    def __init__(
            self,
            api_name: str,
            crud_model: CRUDBase,
            list_limit = 20,
            exception_handler: Optional[Callable] = None,
            *args,
            **kwargs
    ) -> None:
        super().__init__(*args, **kwargs)
        schema_type = crud_model.get_schema_type()
        create_schema_type = crud_model.get_create_schema_type()
        update_schema_type = crud_model.get_update_schema_type()

        prefix = f"/{api_name}"
        prefix_plural = f"/{api_name}s"

        def list_objects(
                db: Session = Depends(get_db),
                limit: int | None = Query(None)
        ):
            objects = crud_model.scan(db=db, limit=limit or list_limit)
            return {"results": [schema_type.model_validate(obj, from_attributes=True) for obj in objects]}

        def get_object(obj = Depends(crud_model_dependency(crud_model))):
            return schema_type.model_validate(obj, from_attributes=True)

        def create_object(
                new_obj: Annotated[create_schema_type, Body()],
                db: Session = Depends(get_db)
        ):
            new_obj = crud_model.create(db=db, obj_in=new_obj)
            return schema_type.model_validate(new_obj, from_attributes=True)

        def update_object(
                obj_input: Annotated[update_schema_type, Body()],
                obj = Depends(crud_model_dependency(crud_model)),
                db: Session = Depends(get_db)
        ):
            updated_obj = crud_model.update(db=db, db_obj=obj, obj_in=obj_input)
            return schema_type.model_validate(updated_obj, from_attributes=True)

        def delete_object(
                obj_id: int,
                db: Session = Depends(get_db)
        ) -> None:
            crud_model.delete(db=db, obj_id=obj_id)

        self.add_api_route(
            f"{prefix}",
            exception_handler()(create_object) if exception_handler else create_object,
            methods=["POST"],
            summary=f"Create {api_name}",
            status_code=status.HTTP_201_CREATED
        )

        self.add_api_route(
            f"{prefix}/{{obj_id}}",
            exception_handler()(get_object) if exception_handler else get_object,
            methods=["GET"],
            summary=f"Get {api_name}",
        )

        self.add_api_route(
            f"{prefix}/{{obj_id}}",
            exception_handler()(update_object) if exception_handler else update_object,
            methods=["PUT"],
            summary=f"Update {api_name}"
        )

        self.add_api_route(
            f"{prefix}/{{obj_id}}",
            exception_handler()(delete_object) if exception_handler else delete_object,
            methods=["DELETE"],
            summary=f"delete {api_name}"
        )

        self.add_api_route(
            f"{prefix_plural}",
            exception_handler()(list_objects) if exception_handler else list_objects,
            methods=["GET"],
            summary=f"List all {api_name}s"
        )
