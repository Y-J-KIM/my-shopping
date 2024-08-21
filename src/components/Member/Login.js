import React, { useState } from "react";
import "./Login.css";
import Header from "../Home/Header";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";
import { loginUser } from "../services/UserServices";

const Login = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setUser } = useUser(); // UserContext에서 setUser 가져오기

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const credentials = { userId, password };
      const result = await loginUser(credentials);

      // 로그인 성공 시 UserContext 업데이트
      setUser(result);
      // 예를 들어, 홈 페이지로 리디렉션
      navigate("/");
    } catch (error) {
      alert("Error logging in: " + error.message);
    }
  };

  return (
    <div>
      <Header />
      <div className="login-page">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>ID:</label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="buttons">
            <Link to="/member/join" className="join-text">
              Join
            </Link>
            <button type="submit">Login</button>
          </div>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
};

export default Login;
