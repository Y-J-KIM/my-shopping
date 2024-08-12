import React, { useState } from "react";
import "./Login.css";
import Header from "../Home/Header";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { login } from "../../service/memberServices";

const Login = () => {
  const [mid, setMid] = useState("");
  const [mpw, setMpw] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login({ mid, mpw });
      setUser(mid); // 사용자 정보를 AuthContext에 저장
      navigate("/"); // 로그인 후 홈 페이지로 이동
    } catch (err) {
      setError(err.message); // 로그인 실패 시 에러 메시지 표시
    }
  };

  return (
    <div>
      <Header />
      <div className="login-page">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="mid">ID:</label>
            <input
              type="text"
              id="mid"
              value={mid}
              onChange={(e) => setMid(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="mpw"
              value={mpw}
              onChange={(e) => setMpw(e.target.value)}
              required
            />
          </div>
          <div className="buttons">
            <Link to="/member/join" className="join-text">
              Join
            </Link>
            <button type="submit">Login</button>
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
