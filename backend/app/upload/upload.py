from fastapi import File, UploadFile, APIRouter
import pandas as pd
from app.signals.signals import process_signals

router = APIRouter()

@router.post("/upload")
async def process_csv(csv_file: UploadFile = File(...)):
    df = pd.read_csv(csv_file.file, comment="#")
    result = process_signals(df)
    return result

@router.get("/")
def health_check():
    return "Backend running!"