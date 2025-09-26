// Modular wrapper logic for Plotly visualizations
import dynamic from "next/dynamic";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

export default function SignalPlot({ data }: { data: any }) {
  if (!data) return null;

  const traces: Partial<Plotly.PlotData>[] = Object.keys(data.channels).map(
    (ch) => ({
      name: ch,
      x: data.time,
      y: data.channels[ch],
      type: "scatter" as const,
      mode: "lines" as const,
    })
  );

  return (
    <Plot
      data={traces as Plotly.Data[]}
      layout={{
        title: { text: "EEG + ECG Viewer" },
        xaxis: { title: { text: "Time (s)" } },
      }}
      style={{ width: "100%", height: "80vh" }}
    />
  );
}
