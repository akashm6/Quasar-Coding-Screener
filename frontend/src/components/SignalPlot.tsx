import dynamic from "next/dynamic";
import { PlotData, Layout } from "plotly.js";
import { useState } from "react";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

export default function SignalPlot({ data }: { data: any }) {
  const [normalize, setNormalize] = useState(false);
  const [hidden, setHidden] = useState<Record<string, boolean>>({});

  if (!data) return <p>No data available</p>;

  const normalizeArray = (arr: number[]) => {
    if (!normalize) return arr;
    const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
    const std = Math.sqrt(
      arr.reduce((a, b) => a + (b - mean) ** 2, 0) / arr.length
    );
    return arr.map((v) => (v - mean) / (std || 1));
  };

  const traces: Partial<PlotData>[] = [
    ...Object.keys(data.eeg_channels || {}).map((ch) => ({
      name: ch,
      x: data.time,
      y: normalize
        ? normalizeArray(data.eeg_channels[ch])
        : data.eeg_channels[ch],
      type: "scatter" as const,
      mode: "lines" as const,
      yaxis: "y1",
      visible: hidden[ch] ? ("legendonly" as const) : true,
    })),
    // ECG stays untouched
    ...Object.keys(data.ecg_channels || {}).map((ch) => ({
      name: ch,
      x: data.time,
      y: data.ecg_channels[ch],
      type: "scatter" as const,
      mode: "lines" as const,
      yaxis: "y2",
      visible: hidden[ch] ? ("legendonly" as const) : true,
    })),
  ];

  const [ranges, setRanges] = useState<{
    x?: [number, number];
    y?: [number, number];
  }>({});

  const handleRelayout = (event: any) => {
    if (event["xaxis.range[0]"] && event["xaxis.range[1]"]) {
      setRanges({
        x: [event["xaxis.range[0]"], event["xaxis.range[1]"]],
        y: [event["yaxis.range[0]"], event["yaxis.range[1]"]],
      });
    }
  };

  const layout: Partial<Layout> = {
    title: { text: "EEG + ECG Viewer" },
    xaxis: { title: { text: "Time (s)" }, range: ranges.x },
    yaxis: { title: { text: "EEG (µV)" }, range: ranges.y },
    yaxis2: {
      title: { text: "ECG/CM" },
      overlaying: "y",
      side: "right",
      autorange: true,
    },
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
      <Plot
        data={traces}
        layout={layout}
        style={{ width: "100%", height: "80vh" }}
        useResizeHandler
        config={{ responsive: true }}
      />
    </div>
  );
}
