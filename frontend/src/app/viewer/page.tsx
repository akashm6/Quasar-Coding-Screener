"use client";
import { useEffect, useState } from "react";
import SignalPlot from "../../components/SignalPlot";

interface SignalData {
  time: number[];
  eeg_channels: Record<string, number[]>;
  ecg_channels: Record<string, number[]>;
  cm_channel: Record<string, number[]>;
}

export default function Viewer() {
  const [data, setData] = useState<SignalData | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("signalData");
    if (saved) {
      setData(JSON.parse(saved) as SignalData);
    }
  }, []);

  return (
    <div className="p-6">
      {!data ? <p>Loading...</p> : <SignalPlot data={data} />}
    </div>
  );
}
