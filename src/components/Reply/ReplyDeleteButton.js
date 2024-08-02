// src/components/Reply/ReplyDeleteButton.js

import React from "react";
import { deleteReply } from "../../service/replyServices";

const ReplyDeleteButton = ({ rno, onReplyDeleted }) => {
  const handleDelete = async () => {
    try {
      await deleteReply(rno);
      onReplyDeleted();
    } catch (err) {
      console.error("Failed to delete reply:", err);
    }
  };

  return <button onClick={handleDelete}>Delete</button>;
};

export default ReplyDeleteButton;
