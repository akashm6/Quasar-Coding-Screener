# EEG/ECG Viewer

An interactive GUI for uploading EEG/ECG `.csv` files and visualizing signals with correct biomedical scaling.

This repository is my submission for the QUASAR Software Intern Coding Screener.

## Features

- Upload raw EEG/ECG `.csv` data
- Interactive Plotly viewer with zoom/pan
- EEG channels (µV scale) shown on left axis
- ECG/EOG + CM (mV scale) shown on right axis
- Normalize toggle for better comparability across EEG channels
- Ignored irrelevant metadata columns (`Trigger`, `ADC_Status`, etc.)
