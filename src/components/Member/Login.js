import React, { useState } from "react";
import "./Login.css";
import Header from "../Home/Header";
import { Link } from "react-router-dom";
import memberService from "../../service/memberServices";

const Login = () => {
  const [mid, setMid] = useState("");
  const [mpw, setMpw] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await memberService.login({ mid, mpw });
      setMessage(response); // 로그인 성공 메시지
    } catch (error) {
      setMessage("로그인 실패");
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
          {message && <p>{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
