import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getBoardListAPI } from "../../service/boardServices";
import Header from "../Home/Header";
import "./boardList.css";

const BoardList = () => {
  const [boardList, setBoardList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [keyword, setKeyword] = useState("");
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchBoardList(); // 페이지 로드 시 목록을 가져옵니다.
  }, [page, size, keyword]);

  const fetchBoardList = async () => {
    try {
      const { data } = await getBoardListAPI(page, size, keyword);
      setBoardList(data.dtoList || []); // 데이터가 없으면 빈 배열로 설정
      setTotal(data.total); // 데이터의 총 개수 설정
    } catch (error) {
      console.error("Failed to fetch board list", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1); // 검색 시 페이지를 1로 초기화
    fetchBoardList();
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div>
      <Header />
      <div>
        <h1>Board List</h1>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search..."
          />
          <button type="submit">Search</button>
        </form>
        <table className="board-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Title</th>
              <th>Writer</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {boardList.length === 0 ? (
              <tr>
                <td colSpan="4" className="no-boards-message">
                  게시글이 없습니다.
                </td>
              </tr>
            ) : (
              boardList.map((board) => (
                <tr key={board.bno}>
                  <td>{board.bno}</td>
                  <td>
                    <Link
                      to={`/board/read/${board.bno}`}
                      className="board-title-link"
                    >
                      {board.title}
                    </Link>
                  </td>
                  <td>{board.writer}</td>
                  <td>{board.regdate}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="buttons">
          <Link to={`/board/register`} className="register-button">
            새 글 작성
          </Link>

          <div>
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page <= 1}
            >
              Previous
            </button>
            <span> Page {page} </span>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page * size >= total}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardList;
