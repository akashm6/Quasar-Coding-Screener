"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import { PlotData, Layout } from "plotly.js";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

export default function SignalPlot({ data }: { data: any }) {
  const [normalize, setNormalize] = useState(false);

  if (!data) return <p>No data available</p>;

  const normalizeArray = (arr: number[]) => {
    if (!normalize) return arr;
    const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
    const std = Math.sqrt(arr.reduce((a, b) => a + (b - mean) ** 2, 0) / arr.length);
    return arr.map((v) => (v - mean) / (std || 1));
  };

  const eegTraces: Partial<PlotData>[] = Object.keys(data.eeg_channels || {}).map((ch) => ({
    name: ch,
    x: data.time,
    y: normalizeArray(data.eeg_channels[ch]),
    type: "scatter" as const,
    mode: "lines" as const,
    line: { width: 0.8 },
    xaxis: "x1",
    yaxis: "y1",
  }));

  const ecgTraces: Partial<PlotData>[] = [
    ...Object.keys(data.ecg_channels || {}).map((ch) => ({
      name: ch,
      x: data.time,
      y: data.ecg_channels[ch],
      type: "scatter" as const,
      mode: "lines" as const,
      line: { width: 1.5 },
      xaxis: "x2",
      yaxis: "y2",
    })),
    ...Object.keys(data.cm_channel || {}).map((ch) => ({
      name: ch,
      x: data.time,
      y: data.cm_channel[ch],
      type: "scatter" as const,
      mode: "lines" as const,
      line: { width: 1.5, dash: "dot" },
      xaxis: "x2",
      yaxis: "y2",
    })),
  ];

  const layout: Partial<Layout> = {
    title: { text: "EEG + ECG Viewer" },
    grid: { rows: 2, columns: 1, pattern: "independent" },

    xaxis: { title: { text: "Time (s)" } },
    yaxis: { title: { text: normalize ? "EEG (z-score)" : "EEG (µV)" } },

    xaxis2: { title: { text: "Time (s)" } },
    yaxis2: { title: { text: "ECG / CM" } },

    legend: { orientation: "h" },
    plot_bgcolor: "#fff",
    paper_bgcolor: "#fff",
  };

  return (
    <div>
      <div className="flex gap-4 mb-4">
        <label>
          <input
            type="checkbox"
            checked={normalize}
            onChange={(e) => setNormalize(e.target.checked)}
          />
          Normalize EEG
        </label>
      </div>
      <Plot data={[...eegTraces, ...ecgTraces]} layout={layout} style={{ width: "100%", height: "85vh" }} />
    </div>
  );
}
