import pandas as pd
import numpy as np

IGNORE_COLS = {"Trigger", "Time_Offset", "ADC_Status", "ADC_Sequence", "Event", "Comments"}

def process_signals(df: pd.DataFrame):
    all_cols = list(df.columns)
    time_col = all_cols[0] 
    channel_cols = [c for c in all_cols[1:] if c not in IGNORE_COLS]

    eeg_channels = {}
    ecg_channels = {}
    cm_channel = {}

    for c in channel_cols:
        if c.startswith("X3"):
            continue
        if c.startswith("X1") or "LEOG" in c:
            ecg_channels["LEFT_ECG"] = df[c].tolist()
        elif c.startswith("X2") or "REOG" in c:
            ecg_channels["RIGHT_ECG"] = df[c].tolist()
        elif c.startswith("CM"):
            cm_channel["CM"] = df[c].tolist()
        else:
            eeg_channels[c] = df[c].tolist()

    time = df[time_col].tolist()

    return {
        "time": time,
        "eeg_channels": eeg_channels,
        "ecg_channels": ecg_channels,
        "cm_channel": cm_channel,
    }
