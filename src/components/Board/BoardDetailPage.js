import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import Header from "../Home/Header";
import Footer from "../Home/Footer";

const BoardDetail = () => {
  const { bno } = useParams();
  const [board, setBoard] = useState(null);
  const history = useNavigate();

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const response = await axios.get(`/api/board/read`, {
          params: { bno },
        });
        setBoard(response.data);
      } catch (error) {
        console.error("Failed to fetch board details", error);
      }
    };
    fetchBoard();
  }, [bno]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this board?")) {
      try {
        await axios.post("/api/board/remove", bno);
        history.push("/board/list");
      } catch (error) {
        console.error("Failed to delete board", error);
      }
    }
  };

  return (
    <div>
      <Header />
      <div>
        {board ? (
          <div>
            <h2>{board.title}</h2>
            <p>{board.content}</p>
            <p>{board.writer}</p>
            {board.imagePath && <img src={board.imagePath} alt="Board Image" />}
            <button onClick={handleDelete}>Delete</button>
            <Link to={`/board/modify/${board.bno}`}>Edit</Link>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default BoardDetail;
