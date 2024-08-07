import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  readBoardAPI,
  modifyBoardAPI,
  removeBoardAPI,
} from "../../service/boardServices"; // 수정
import "./BoardDetailPage.css"; // 스타일 파일을 임포트합니다.
import Header from "../Home/Header";

const BoardDetailPage = () => {
  const { id } = useParams(); // URL 파라미터로부터 게시글 번호 가져오기
  const [board, setBoard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedContent, setUpdatedContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchBoardDetail();
  }, [id]);

  const fetchBoardDetail = async () => {
    setLoading(true);
    try {
      const { data } = await readBoardAPI(id);
      setBoard(data);
      setUpdatedTitle(data.title);
      setUpdatedContent(data.content);
    } catch (error) {
      console.error("Failed to fetch board detail", error);
    } finally {
      setLoading(false);
    }
  };

  const handleModify = async () => {
    try {
      await modifyBoardAPI({
        id,
        title: updatedTitle,
        content: updatedContent,
      });
      alert("Board updated successfully!");
      setIsEditing(false);
      fetchBoardDetail(); // 새 데이터로 갱신
    } catch (error) {
      console.error("Failed to modify board", error);
    }
  };

  const handleDelete = async () => {
    try {
      await removeBoardAPI(id);
      alert("Board removed successfully!");
      navigate("/board/list"); // 목록 페이지로 이동
    } catch (error) {
      console.error("Failed to remove board", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!board) {
    return <div>Board not found</div>;
  }

  return (
    <div className="board-detail-page">
      <Header />
      <div className="board-detail-container">
        <h1>Board Details</h1>
        {isEditing ? (
          <div className="edit-form">
            <input
              type="text"
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
              placeholder="Title"
            />
            <textarea
              value={updatedContent}
              onChange={(e) => setUpdatedContent(e.target.value)}
              placeholder="Content"
            />
            <button onClick={handleModify}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        ) : (
          <div className="board-detail-content">
            <div className="board-info">
              <div className="board-info-item">
                <strong>No:</strong> {board.bno}
              </div>
              <div className="board-info-item">
                <strong>Title:</strong> {board.title}
              </div>
              <div className="board-info-item">
                <strong>Writer:</strong> {board.writer}
              </div>
              <div className="board-info-item">
                <strong>Date:</strong> {board.regdate}
              </div>
            </div>
            <div className="board-content">
              <h2>Content</h2>
              <p>{board.content}</p>
            </div>
            {board.imagePath && (
              <div className="board-image">
                <h2>Image</h2>
                <img
                  src={board.imagePath}
                  alt={board.title}
                  className="board-image"
                />
              </div>
            )}
            <div className="board-buttons">
              <div className="board-actions">
                <Link
                  to={`/board/modify/${board.bno}`}
                  className="btn btn-edit"
                >
                  수정
                </Link>
                <Link
                  to={`/board/remove`}
                  onClick={handleDelete}
                  className="btn btn-delete"
                >
                  삭제
                </Link>
              </div>
              <Link to={`/board/list`} className="list-button">
                List
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BoardDetailPage;
