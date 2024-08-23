import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../Home/Header";
import Footer from "../Home/Footer";
import "./boardList.css";

export const getBoardListAPI = (page, size, keyword) => {
  return axios.get(`/api/board/list`, {
    params: {
      page: page,
      size: size,
      keyword: keyword,
    },
  });
};

const BoardList = () => {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [keyword, setKeyword] = useState("");

  const fetchBoards = async () => {
    try {
      const { data } = await getBoardListAPI(page, size, keyword);
      console.log("Fetched data:", data); // 데이터 구조 확인
      setBoards(data.dtoList || []); // 데이터가 없으면 빈 배열로 설정
      setTotal(data.total); // 데이터의 총 개수 설정
    } catch (error) {
      console.error("Failed to fetch board list", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, [page, size, keyword]); // page, size, keyword가 변경될 때마다 fetchBoards 호출

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1); // 검색 시 페이지를 1로 초기화
    fetchBoards(); // 검색 후 다시 게시글을 가져옴
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= Math.ceil(total / size)) {
      setPage(newPage);
    }
  };

  return (
    <div>
      <Header />
      <div>
        <h1>게시글 목록</h1>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="검색..."
          />
          <button type="submit">검색</button>
        </form>
        <table className="board-table">
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>작성자</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody>
            {boards.length === 0 ? (
              <tr>
                <td colSpan="4" className="no-boards-message">
                  게시글이 없습니다.
                </td>
              </tr>
            ) : (
              boards.map((board) => (
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
                  <td>{new Date(board.regDate).toLocaleDateString()}</td>
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
              이전
            </button>
            <span> 페이지 {page} </span>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page * size >= total}
            >
              다음
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BoardList;
