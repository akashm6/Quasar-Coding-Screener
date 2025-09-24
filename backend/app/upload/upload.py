# Routes for CSV upload
from fastapi import File, UploadFile, APIRouter
import pandas as pd
from app.signals.signals import process_signals

router = APIRouter()

@router.post("/upload")
async def process_csv(csv_file: UploadFile = File(...)):
    df = pd.read_csv(csv_file.file, comment='#')
    #print("Read csv: ", df)
    plot_traces, ecg_map = process_signals(df)
    
    return {"ecg_map": ecg_map, "traces": plot_traces}