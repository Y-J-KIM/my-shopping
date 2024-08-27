import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../Home/Header";
import Footer from "../Home/Footer";
import { useUser } from "../UserContext"; // UserContext에서 useUser 훅 가져오기
import "./BoardRegister.css";

const BoardRegister = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const user = useUser(); // 현재 로그인된 사용자 정보 가져오기
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("writer", user.username); // writer에 user.id 설정
    if (image) {
      formData.append("image", image);
    }

    try {
      await axios.post("/api/board/register", formData);
      navigate("/board/list");
    } catch (error) {
      console.error("Failed to register board", error);
    }
  };

  return (
    <div>
      <Header />
      <div className="board-register-page">
        <h1>Register Board</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">제목</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="content">내용</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="writer">작성자</label>
            <input
              type="text"
              id="writer"
              value={user.username} // writer 필드에 user.id 설정
              readOnly
            />
          </div>
          <div>
            <label htmlFor="image">첨부파일</label>
            <input
              type="file"
              id="image"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <button type="submit">작성완료</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default BoardRegister;
