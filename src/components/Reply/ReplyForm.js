// // src/components/Reply/ReplyForm.js

// import React, { useState, useEffect } from "react";
// import { addReply, updateReply } from "../../service/replyServices";

// const ReplyForm = ({ bno, replyToEdit, onReplyAddedOrUpdated }) => {
//   const [comment, setComment] = useState("");
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (replyToEdit) {
//       setComment(replyToEdit.comment);
//     }
//   }, [replyToEdit]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (replyToEdit) {
//         await updateReply(replyToEdit.rno, { comment });
//       } else {
//         await addReply({ bno, comment });
//       }
//       onReplyAddedOrUpdated();
//       setComment("");
//     } catch (err) {
//       setError("Failed to save reply.");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <textarea
//         value={comment}
//         onChange={(e) => setComment(e.target.value)}
//         placeholder="Write a reply..."
//         required
//       />
//       <button type="submit">
//         {replyToEdit ? "Update Reply" : "Add Reply"}
//       </button>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//     </form>
//   );
// };

// export default ReplyForm;
