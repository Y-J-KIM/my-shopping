// // src/components/FileDelete.js

// import React from "react";
// import { deleteFile } from "../service/fileServices";

// const FileDelete = ({ fileName, onFileDeleted }) => {
//   const handleDelete = async () => {
//     try {
//       await deleteFile(fileName);
//       onFileDeleted();
//     } catch (error) {
//       console.error(`Failed to delete file ${fileName}:`, error);
//     }
//   };

//   return <button onClick={handleDelete}>Delete</button>;
// };

// export default FileDelete;
