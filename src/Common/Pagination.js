import React from "react";
import { useHistory } from "react-router-dom";

const Pagination = ({ responseDTO }) => {
  const history = useHistory();

  const handlePageChange = (num) => {
    history.push(`/board/list?page=${num}`);
  };

  return (
    <ul className="pagination flex-wrap">
      {responseDTO.prev && (
        <li className="page-item">
          <button
            className="page-link"
            onClick={() => handlePageChange(responseDTO.start - 1)}
          >
            이전
          </button>
        </li>
      )}

      {[...Array(responseDTO.end - responseDTO.start + 1).keys()].map((i) => (
        <li
          key={i + responseDTO.start}
          className={`page-item ${
            responseDTO.page === i + responseDTO.start ? "active" : ""
          }`}
        >
          <button
            className="page-link"
            onClick={() => handlePageChange(i + responseDTO.start)}
          >
            {i + responseDTO.start}
          </button>
        </li>
      ))}

      {responseDTO.next && (
        <li className="page-item">
          <button
            className="page-link"
            onClick={() => handlePageChange(responseDTO.end + 1)}
          >
            다음
          </button>
        </li>
      )}
    </ul>
  );
};

export default Pagination;
