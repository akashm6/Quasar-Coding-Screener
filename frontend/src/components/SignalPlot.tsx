import dynamic from "next/dynamic";
import { PlotData, Layout } from "plotly.js";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

export default function SignalPlot({ data }: { data: any }) {
  if (!data) return <p>No data available</p>;

  // pass in already formatted traces from the backend
  const traces: Partial<PlotData>[] = data.traces;

  const layout: Partial<Layout> = {
    title: { text: "EEG + ECG Viewer" },
    xaxis: { title: { text: "Time (s)" } },
    yaxis: { title: { text: "EEG (µV)" }, autorange: true },
    yaxis2: {
      title: { text: "ECG/EOG" },
      overlaying: "y",
      side: "right",
      autorange: true,
    },
  };

  return (
    <Plot
      data={traces}
      layout={layout}
      style={{ width: "100%", height: "80vh" }}
    />
  );
}
