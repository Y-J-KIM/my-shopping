import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import "./BoardList.css"; // CSS 파일이 필요하다면 포함

const BoardList = () => {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const history = useHistory();
  const location = useLocation();
  const [pageRequestDTO, setPageRequestDTO] = useState({
    size: 10,
    type: "",
    keyword: "",
    page: 1,
  });

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const response = await axios.get("/api/board/list", { params });
        setBoards(response.data.dtoList);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch boards");
        setLoading(false);
      }
    };

    fetchBoards();
  }, [location.search]);

  const handleSearch = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const params = new URLSearchParams(formData).toString();
    history.push(`/board/list?${params}`);
  };

  const handleClear = () => {
    history.push("/board/list");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div className="row mt-3">
        <form onSubmit={handleSearch}>
          <div className="col">
            <input type="hidden" name="size" value={pageRequestDTO.size} />
            <div className="input-group">
              <div className="input-group-prepend">
                <select
                  className="form-select"
                  name="type"
                  defaultValue={pageRequestDTO.type}
                >
                  <option value="">---</option>
                  <option value="t">제목</option>
                  <option value="c">내용</option>
                  <option value="w">작성자</option>
                  <option value="tc">제목 내용</option>
                  <option value="tcw">제목 내용 작성자</option>
                </select>
              </div>
              <input
                type="text"
                className="form-control"
                name="keyword"
                defaultValue={pageRequestDTO.keyword}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary searchBtn"
                  type="submit"
                >
                  Search
                </button>
                <button
                  className="btn btn-outline-secondary clearBtn"
                  type="button"
                  onClick={handleClear}
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className="row mt-3">
        <div className="col">
          <div className="card">
            <div className="card-header">Board List</div>
            <div className="card-body">
              <h5 className="card-title">Board List</h5>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Bno</th>
                    <th scope="col">Title</th>
                    <th scope="col">Writer</th>
                    <th scope="col">RegDate</th>
                  </tr>
                </thead>
                <tbody>
                  {boards.map((dto) => (
                    <tr key={dto.bno}>
                      <th scope="row">{dto.bno}</th>
                      <td>
                        <a href={`/board/read?bno=${dto.bno}`}>{dto.title}</a>
                        <span
                          className="badge"
                          style={{ backgroundColor: "#0a53be" }}
                        >
                          {dto.replyCount}
                        </span>
                        {dto.boardImages && dto.boardImages.length > 0 && (
                          <div>
                            {dto.boardImages.map((boardImage) => (
                              <img
                                key={boardImage.uuid}
                                style={{ width: "100px" }}
                                src={`/view/s_${boardImage.uuid}_${boardImage.fileName}`}
                                alt="Board"
                              />
                            ))}
                          </div>
                        )}
                      </td>
                      <td>{dto.writer}</td>
                      <td>{new Date(dto.regDate).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="float-end">
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => history.push("/board/register")}
                >
                  글쓰기
                </button>
                {/* Pagination component should be created */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardList;
