import React, { useState } from "react";
import "./Login.css";
import Header from "../Home/Header";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../AuthContext"; // useAuth 훅을 사용하여 로그인 기능을 가져옵니다.

function Login() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth(); // useAuth 훅을 사용하여 로그인 함수를 가져옵니다.
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(userId, password); // useAuth 훅을 사용하여 로그인 요청을 보냅니다.
      alert('로그인 성공!');
      navigate('/'); // 로그인 성공 후 홈 페이지로 리다이렉트합니다.
    } catch (error) {
      alert('잘못된 자격 증명입니다.');
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
      </div>
    </div>
  );
};

export default Login;
