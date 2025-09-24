from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.upload import router

app = FastAPI()

app.add_middleware(CORSMiddleware(
    allow_origins=['*'],
    allow_headers=['*'],
    allow_methods=['*'],
    allow_credentials=True
    )
)

app.include_router(router, prefix = "/api")

