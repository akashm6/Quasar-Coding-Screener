// CSV file uploader component for landing page will go here
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function FileUploader() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
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
      console.log("FILE: ", selectedFile);
      formData.append("csv_file", selectedFile);
      console.log(formData)
      const res = await fetch(`${BACKEND_ROUTE}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        console.error(`Upload failed with this error: ${res.status}`);
        return;
      }
      const data = await res.json();
      console.log("upload data: ", data);
      // API logic goes here
    } catch (err) {
      console.error(err);
      return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={onFileChange} />
      <button onClick={handleUpload}>Upload!!</button>
      {loading && "Loading..."}
    </div>
  );
}
