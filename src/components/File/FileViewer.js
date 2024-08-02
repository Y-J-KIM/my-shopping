// src/components/FileViewer.js

import React, { useEffect, useState } from "react";
import { fetchFile } from "../services/fileServices";

const FileViewer = ({ fileName }) => {
  const [fileUrl, setFileUrl] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadFile = async () => {
      try {
        const fileBlob = await fetchFile(fileName);
        setFileUrl(URL.createObjectURL(fileBlob));
      } catch (err) {
        setError("Failed to load file.");
      }
    };

    loadFile();
  }, [fileName]);

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {fileUrl && (
        <div>
          <img src={fileUrl} alt="File" style={{ maxWidth: "100%" }} />
          {/* 파일이 이미지가 아닌 경우에는 다른 방법으로 표시 */}
        </div>
      )}
    </div>
  );
};

export default FileViewer;
