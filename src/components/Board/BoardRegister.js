import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../Home/Header';
import "./BoardRegister.css";

const BoardRegister = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [writer, setWriter] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('writer', writer);
    if (image) {
      formData.append('image', image);
    }

    try {
      await axios.post('/api/board/register', formData);
      navigate('/board/list');
    } catch (error) {
      console.error('Failed to register board', error);
    }
  };

  return (
    <div>
      <Header />
      <div className="board-register-page">
        <h1>Register Board</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="content">Content:</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="writer">Writer:</label>
            <input
              type="text"
              id="writer"
              value={writer}
              onChange={(e) => setWriter(e.target.value)}
              //readOnly
            />
          </div>
          <div>
            <label htmlFor="image">Image:</label>
            <input
              type="file"
              id="image"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};


export default BoardRegister;
