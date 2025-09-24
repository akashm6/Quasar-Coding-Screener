# All signal processing logic goes here
import pandas as pd

def process_signals(df: pd.DataFrame):
    
    all_cols = list(df.columns)
    time = all_cols[0]
    eeg_cols = all_cols[1:]
    
    ecg_map = {}
    
    for c in eeg_cols:
        if c.startswith("X1") or "LEOG" in c:
            ecg_map["LEFT_ECG"] = c
        elif c.startswith("X2") or "REOG" in c:
            ecg_map["RIGHT_ECG"] = c
        
    return df[eeg_cols].to_dict(orient='list'), df[time], ecg_map
    

    
    
    
    