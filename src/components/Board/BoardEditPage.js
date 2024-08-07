import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  readBoardAPI,
  modifyBoardAPI,
  removeBoardImageAPI,
} from "../../service/boardServices"; // 수정
import Header from "../Home/Header";
import "./BoardEditPage.css"; // 스타일 파일을 임포트합니다.

const BoardEditPage = () => {
  const { id } = useParams(); // URL 파라미터로부터 게시글 번호 가져오기
  const [board, setBoard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedContent, setUpdatedContent] = useState("");
  const [image, setImage] = useState(null);
  const [existingImages, setExistingImages] = useState([]);
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
      setExistingImages(data.fileNames || []); // 이미지 파일 이름 목록 설정
    } catch (error) {
      console.error("Failed to fetch board detail", error);
    } finally {
      setLoading(false);
    }
  };

  const handleModify = async () => {
    const formData = new FormData();
    formData.append("title", updatedTitle);
    formData.append("content", updatedContent);
    if (image) {
      formData.append("image", image);
    }

    try {
      await modifyBoardAPI(id, formData);
      alert("Board updated successfully!");
      navigate(`/board/detail/${id}`); // 디테일 페이지로 이동
    } catch (error) {
      console.error("Failed to modify board", error);
    }
  };

  const handleDeleteImage = async (fileName) => {
    try {
      await removeBoardImageAPI(fileName);
      alert("Image removed successfully!");
      fetchBoardDetail(); // 이미지를 삭제한 후 데이터를 갱신
    } catch (error) {
      console.error("Failed to remove image", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!board) {
    return <div>Board not found</div>;
  }

  return (
    <div className="board-edit-page">
      <Header />
      <div className="board-edit-container">
        <h1>Edit Board</h1>
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
          <div>
            <label htmlFor="image">New Image:</label>
            <input
              type="file"
              id="image"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          {existingImages.length > 0 && (
            <div className="existing-images">
              <h2>Existing Images</h2>
              {existingImages.map((fileName, index) => (
                <div key={index} className="image-item">
                  <img
                    src={`/view/${fileName}`}
                    alt={`board-${id}-image-${index}`}
                    className="board-image"
                  />
                  <button
                    onClick={() => handleDeleteImage(fileName)}
                    className="btn btn-delete"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
          <button onClick={handleModify} className="btn btn-save">
            Save
          </button>
          <button
            onClick={() => navigate(`/board/detail/${id}`)}
            className="btn btn-cancel"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
export default BoardEditPage;
