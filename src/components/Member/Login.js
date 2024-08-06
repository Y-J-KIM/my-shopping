// LoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../service/memberServices"; // 로그인 요청을 처리하는 서비스 함수
import "./Login.css";
import Header from "../Home/Header";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await login({ email, password });
      // 성공적으로 로그인 시 토큰 등을 저장하고 홈 페이지로 리다이렉트
      localStorage.setItem("token", response.token); // 예를 들어, 응답에 토큰이 포함되어 있다고 가정
      navigate("/"); // 홈 페이지로 리다이렉트
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="login-page">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          {error && <div className="error">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
