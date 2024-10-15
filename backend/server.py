import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from starlette.requests import Request

from app.api.router import router
from app.api.endpoints.crud_api import ApiException

app = FastAPI()

app.include_router(router, prefix="/api/v1")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(ApiException)
def exception_handler(_: Request, e: ApiException):
    return JSONResponse(status_code=e.status_code, content={"detail": e.detail})


@app.exception_handler(Exception)
async def log_all_exceptions_middleware(_: Request, e: Exception):
    return JSONResponse(
        status_code=500,
        content={"detail": str(e)},
        headers={"Access-Control-Allow-Origin": "*"},
    )


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, log_config=None)
