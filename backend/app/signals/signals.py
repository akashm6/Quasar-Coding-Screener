# All signal processing logic goes here
import pandas as pd
from collections import defaultdict

def process_signals(df: pd.DataFrame):
    
    all_cols = list(df.columns)
    time = all_cols[0]
    eeg_cols = all_cols[1:]
    
    traces = []
    ecg_map = defaultdict()
    
    for c in eeg_cols:
        if c.startswith("X1") or "LEOG" in c:
            ecg_map["LEFT_ECG"] = c
        elif c.startswith("X2") or "REOG" in c:
            ecg_map["RIGHT_ECG"] = c
            
    x = df[time].tolist()
    
    for c in eeg_cols:
        y = df[c].astype(float).tolist()
        trace = {
            "name": c,
            "x": x,
            "y": y
        }
        traces.append(trace)
        
    return traces, ecg_map
    

    
    
    
    