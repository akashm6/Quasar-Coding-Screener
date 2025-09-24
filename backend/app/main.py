from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv
from app.upload.upload import router

load_dotenv()

final_frontend_url = os.getenv("FINAL_FRONTEND_URL") or None

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_headers=['*'],
    allow_methods=['*'],
    allow_credentials=True
)

app.include_router(router)

