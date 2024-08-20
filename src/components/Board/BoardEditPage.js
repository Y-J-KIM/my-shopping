import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Header from "../Home/Header";
import "./BoardEditPage.css"; 

const BoardModify = () => {
  const { bno } = useParams();
  const [board, setBoard] = useState({ title: '', content: '', writer: '' });
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedContent, setUpdatedContent] = useState("");
  const [image, setImage] = useState(null);
  const [existingImages, setExistingImages] = useState([]);
  const history = useNavigate();

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const response = await axios.get(`/api/board/read`, { params: { bno } });
        setBoard(response.data);
      } catch (error) {
        console.error('Failed to fetch board details', error);
      }
    };
    fetchBoard();
  }, [bno]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/api/board/modify', board);
      history.push(`/board/read/${bno}`);
    } catch (error) {
      console.error('Failed to modify board', error);
    }
  };
  

  return (
    <div>
      <h2>Edit Board</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={board.title}
          onChange={(e) => setBoard({ ...board, title: e.target.value })}
          placeholder="Title"
          required
        />
        <textarea
          value={board.content}
          onChange={(e) => setBoard({ ...board, content: e.target.value })}
          placeholder="Content"
          required
        />
        <input
          type="text"
          value={board.writer}
          onChange={(e) => setBoard({ ...board, writer: e.target.value })}
          placeholder="Writer"
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default BoardModify;
