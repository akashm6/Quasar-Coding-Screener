"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2, Upload } from "lucide-react";

export default function FileUploader() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const BACKEND_ROUTE =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      console.error("Please select a file first!");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("csv_file", selectedFile);

      const res = await fetch(`${BACKEND_ROUTE}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        console.error(`Upload failed: ${res.status}`);
        return;
      }

      const data = await res.json();
      localStorage.setItem("signalData", JSON.stringify(data));
      router.push("/viewer");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <label className="w-full cursor-pointer flex items-center justify-center rounded-md border border-dashed border-zinc-400/60 p-4 text-sm text-zinc-600 hover:border-indigo-400 hover:text-indigo-500 hover:shadow-md hover:shadow-indigo-500/20 transition">
        <input
          type="file"
          accept=".csv"
          onChange={onFileChange}
          className="hidden"
        />
        {selectedFile ? (
          <span>{selectedFile.name}</span>
        ) : (
          <span className="flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Choose CSV File
          </span>
        )}
      </label>

      <Button
        onClick={handleUpload}
        disabled={loading || !selectedFile}
        className="w-full hover:shadow-md hover:shadow-indigo-500/30 transition cursor-pointer"
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {loading ? "Uploading..." : "Upload"}
      </Button>
    </div>
  );
}
