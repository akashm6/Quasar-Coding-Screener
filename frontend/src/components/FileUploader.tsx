// CSV file uploader component for landing page will go here
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function FileUploader() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

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

      <button onClick={handleUpload}></button>
      {loading && "Loading..."}
    </div>
  );
}
