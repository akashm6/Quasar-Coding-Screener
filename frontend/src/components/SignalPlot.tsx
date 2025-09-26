"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import { PlotData, Layout } from "plotly.js";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

export default function SignalPlot({ data }: { data: any }) {
  const [normalize, setNormalize] = useState(false);
  const [selectedEEG, setSelectedEEG] = useState<string[]>([]);
  const [selectedECG, setSelectedECG] = useState<string[]>([]);

  if (!data) return <p>No data available</p>;

  const normalizeArray = (arr: number[]) => {
    if (!normalize) return arr;
    const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
    const std = Math.sqrt(arr.reduce((a, b) => a + (b - mean) ** 2, 0) / arr.length);
    return arr.map((v) => (v - mean) / (std || 1));
  };

  const toggleChannel = (ch: string, type: "EEG" | "ECG") => {
    if (type === "EEG") {
      setSelectedEEG((prev) =>
        prev.includes(ch) ? prev.filter((c) => c !== ch) : [...prev, ch]
      );
    } else {
      setSelectedECG((prev) =>
        prev.includes(ch) ? prev.filter((c) => c !== ch) : [...prev, ch]
      );
    }
  };

  const toggleAll = (type: "EEG" | "ECG") => {
    if (type === "EEG") {
      const allEEG = Object.keys(data.eeg_channels || {});
      setSelectedEEG(selectedEEG.length === allEEG.length ? [] : allEEG);
    } else {
      const allECG = [
        ...Object.keys(data.ecg_channels || {}),
        ...Object.keys(data.cm_channel || {}),
      ];
      setSelectedECG(selectedECG.length === allECG.length ? [] : allECG);
    }
  };

  const eegTraces: Partial<PlotData>[] = Object.keys(data.eeg_channels || {})
    .filter((ch) => selectedEEG.length === 0 || selectedEEG.includes(ch))
    .map((ch) => ({
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
    ...Object.keys(data.ecg_channels || {})
      .filter((ch) => selectedECG.length === 0 || selectedECG.includes(ch))
      .map((ch) => ({
        name: ch,
        x: data.time,
        y: data.ecg_channels[ch],
        type: "scatter" as const,
        mode: "lines" as const,
        line: { width: 1.5 },
        xaxis: "x2",
        yaxis: "y2",
      })),
    ...Object.keys(data.cm_channel || {})
      .filter((ch) => selectedECG.length === 0 || selectedECG.includes(ch))
      .map((ch) => ({
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
      <div className="flex gap-4 mb-4 items-center">
        <label>
          <input
            type="checkbox"
            checked={normalize}
            onChange={(e) => setNormalize(e.target.checked)}
          />
          Normalize EEG
        </label>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Select EEG Channels</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="max-h-64 overflow-y-auto">
            <DropdownMenuItem onSelect={(e) => e.preventDefault()} onClick={() => toggleAll("EEG")}>
              {selectedEEG.length === Object.keys(data.eeg_channels || {}).length
                ? "Deselect All"
                : "Select All"}
            </DropdownMenuItem>
            {Object.keys(data.eeg_channels || {}).map((ch) => (
              <DropdownMenuCheckboxItem
                key={ch}
                checked={selectedEEG.includes(ch)}
                onCheckedChange={() => toggleChannel(ch, "EEG")}
                onSelect={(e) => e.preventDefault()} 
              >
                {ch}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Select ECG/CM Channels</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="max-h-64 overflow-y-auto">
            <DropdownMenuItem onSelect={(e) => e.preventDefault()} onClick={() => toggleAll("ECG")}>
              {selectedECG.length ===
              [
                ...Object.keys(data.ecg_channels || {}),
                ...Object.keys(data.cm_channel || {}),
              ].length
                ? "Deselect All"
                : "Select All"}
            </DropdownMenuItem>
            {[...Object.keys(data.ecg_channels || {}), ...Object.keys(data.cm_channel || {})].map(
              (ch) => (
                <DropdownMenuCheckboxItem
                  key={ch}
                  checked={selectedECG.includes(ch)}
                  onCheckedChange={() => toggleChannel(ch, "ECG")}
                  onSelect={(e) => e.preventDefault()} 
                >
                  {ch}
                </DropdownMenuCheckboxItem>
              )
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Plot
        data={[...eegTraces, ...ecgTraces]}
        layout={layout}
        style={{ width: "100%", height: "85vh" }}
      />
    </div>
  );
}
