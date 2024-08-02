// src/components/Reply/ReplyList.js

import React, { useEffect, useState } from "react";
import { getReplies } from "../../services/replyServices";

const ReplyList = ({ bno }) => {
  const [replies, setReplies] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReplies = async () => {
      try {
        const pageRequestDTO = { page: 1, size: 10 }; // 페이지 요청 DTO 예시
        const response = await getReplies(bno, pageRequestDTO);
        setReplies(response.content);
      } catch (err) {
        setError("Failed to load replies.");
      }
    };

    fetchReplies();
  }, [bno]);

  return (
    <div>
      <h3>Replies</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {replies.map((reply) => (
          <li key={reply.rno}>{reply.comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default ReplyList;
