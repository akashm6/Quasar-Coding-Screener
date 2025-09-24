# Routes for CSV upload
from fastapi import File, UploadFile, APIRouter
import pandas as pd
from app.signals.signals import process_signals
import numpy as np

router = APIRouter()

@router.post("/upload")
async def process_csv(csv_file: UploadFile = File(...)):
    df = pd.read_csv(csv_file.file, comment='#')
    
    df = df.replace([np.inf, -np.inf], np.nan)
    df = df.fillna(0)

    plot_traces, ecg_map = process_signals(df)
    
    return {"ecg_map": ecg_map, "traces": plot_traces}