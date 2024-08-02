import React, { useState, useEffect } from "react";
import { getBoardListAPI } from "../../service/boardServices";

const BoardList = () => {
  const [boardList, setBoardList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBoardList = async () => {
      try {
        const { data } = await getBoardListAPI({ page: 1, size: 10 });
        setBoardList(data.dtoList);
      } catch (error) {
        console.error("Failed to fetch board list", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBoardList();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Board List</h1>
      <ul>
        {boardList.map((board) => (
          <li key={board.bno}>
            {board.title} - {board.writer}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BoardList;
