"use client";
// Visualization viewing page logic goes here
import { useEffect, useState } from "react";
import SignalPlot from "../../components/SignalPlot";

export default function Viewer() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem("signalData");
    console.log(saved)
    if (saved) {
      setData(JSON.parse(saved));
    }
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">EEG + ECG Viewer</h1>
      {!data ? <p>Loading...</p> : <SignalPlot data={data} />}
    </div>
  );
}
