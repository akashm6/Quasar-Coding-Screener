# EEG/ECG Signal Viewer

An interactive tool for visualizing **EEG and ECG biosignals** from CSV uploads.

Built with **Next.js + TypeScript** on the frontend and a lightweight **FastAPI backend**, featuring **Plotly.js** for dual synchronized signal plots and a modern UI styled with **Tailwind CSS** and **shadcn/ui**.

This repository is my submission for the QUASAR Software Intern Coding Screener.

## Demo & Links

- **Live App**: [Deployed Link](https://quasar-coding-screener.vercel.app/)
- **Demo Video**: [Demo](https://www.youtube.com/watch?v=PKlduijkDb4)

## Key Features

- **Dual Signal Visualization**  
  Upload a CSV file with both EEG and ECG/CM signals, plotted simultaneously with independent or synchronized time axes.

- **Channel Selection Menus**  
  Toggle individual EEG and ECG channels (or select/deselect all) via clean dropdowns with checkboxes.

- **Normalization Mode**  
  Instantly switch EEG plots between raw **µV values** and **z-score normalization** for clearer cross-channel comparison.

- **Interactive Zoom & Pan**  
  Zoom into specific time windows, pan across the timeline, and reset axes with Plotly’s built-in controls.

- **Responsive Layout**  
  All components (FileUploader, Viewer, Sidebar) adapt seamlessly for desktop and smaller screens.

- **Modern UI Styling**  
  Built with **shadcn/ui components**, **Tailwind CSS**, and subtle glow/hover states for buttons and file inputs.

## Tech Stack

- **Frontend**: Next.js, TypeScript, Tailwind CSS
- **Visualization**: Plotly.js (dual subplots, sync toggle, normalization)
- **Backend**: FastAPI, Pandas (CSV parsing)
- **Deployment**: Vercel (frontend) + Railway (backend)

## How It Works

### 1. Upload CSV

- User uploads a `.csv` file containing:
  - `time` column (in seconds)
  - EEG channel columns (`Fp1`, `Fp2`, etc.)
  - ECG/CM channel columns

The backend parses the CSV and returns a structured JSON with time and organized channels.

**Endpoint:**

```http
POST /upload
```

**Request Body:**

- A multipart form upload with one field:
  - `csv_file`: The EEG/ECG data file in `.csv` format

```bash
curl -X POST http://{BACKEND_ROUTE}/upload \
  -F "csv_file=@sample_signals.csv"
```

**Truncated Response Body:**

```json
{
  "time": [0.0, 0.1, 0.2, 0.3],
  "eeg_channels": {
    "Fp1": [12.1, 12.4, 12.8, 13.0],
    "Fp2": [14.0, 14.2, 14.6, 14.9],
    "Cz": [10.5, 10.6, 10.8, 11.0]
  },
  "ecg_channels": {
    "LEFT_ECG": [0.03, 0.04, 0.05, 0.06],
    "RIGHT_ECG": [0.02, 0.03, 0.04, 0.05]
  },
  "cm_channel": {
    "CM": [0.01, 0.02, 0.03, 0.04]
  }
}
```

### 2. Plot Viewer

- EEG signals are plotted in the **top subplot**
- ECG/CM signals are plotted in the **bottom subplot**
- Users can:
  - Toggle **Normalize EEG** to view normalized EEG signals
  - Toggle **Sync/Unsync Time Axes** to compare EEG + ECG signals in synced/unsynced time
  - Enable/disable specific channels for more concise views

### 3. Interactive Exploration

- Users can zoom, pan, reset axes, and compare any combination of EEG + ECG data over the same timeframes.

---

## Project Structure

```bash
.
├── README.md
├── backend
│   ├── app
│   │   ├── main.py
│   │   ├── signals
│   │   │   └── signals.py
│   │   └── upload
│   │       └── upload.py
│   └── requirements.txt
└── frontend
    ├── components.json
    ├── eslint.config.mjs
    ├── next-env.d.ts
    ├── next.config.ts
    ├── package-lock.json
    ├── package.json
    ├── postcss.config.mjs
    ├── public
    │   ├── file.svg
    │   ├── globe.svg
    │   ├── next.svg
    │   ├── vercel.svg
    │   └── window.svg
    ├── src
    │   ├── app
    │   │   ├── favicon.ico
    │   │   ├── globals.css
    │   │   ├── layout.tsx
    │   │   ├── page.tsx
    │   │   └── viewer
    │   │       └── page.tsx
    │   ├── components
    │   │   ├── FileUploader.tsx
    │   │   ├── SignalPlot.tsx
    │   │   ├── VizSidebar.tsx
    │   │   └── ui
    │   │       ├── button.tsx
    │   │       ├── card.tsx
    │   │       ├── dropdown-menu.tsx
    │   │       └── input.tsx
    │   └── lib
    │       └── utils.ts
    └── tsconfig.json
```

## Local Setup

### 1. Clone & Install

```bash
git clone https://github.com/akashm6/Quasar-Coding-Screener.git
cd frontend/
npm install
cd ../backend
pip install -r requirements.txt
```

### 2. Start Dev Server

```bash
npm run dev # start frontend in frontend/
uvicorn app.main:app --reload --port 8000 # start backend in backend/
```
