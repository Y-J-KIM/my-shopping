// // src/components/FileUpload.js

// import React, { useState } from "react";
// import { uploadFiles } from "../service/fileServices";

// const FileUpload = () => {
//   const [files, setFiles] = useState([]);
//   const [uploading, setUploading] = useState(false);
//   const [error, setError] = useState("");

//   const handleFileChange = (event) => {
//     setFiles(event.target.files);
//   };

//   const handleUpload = async () => {
//     setUploading(true);
//     setError("");
//     const formData = new FormData();
//     Array.from(files).forEach((file) => formData.append("files", file));

//     try {
//       const result = await uploadFiles(formData);
//       console.log("Upload result:", result);
//     } catch (err) {
//       setError("Failed to upload files.");
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div>
//       <input type="file" multiple onChange={handleFileChange} />
//       <button onClick={handleUpload} disabled={uploading}>
//         {uploading ? "Uploading..." : "Upload"}
//       </button>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//     </div>
//   );
// };

// export default FileUpload;
