// src/components/Member/Register.js

import React, { useState } from "react";
import { register } from "../../service/memberServices";
import "./Register.css";
import Header from "../Home/Header";
import { useNavigate } from "react-router-dom";
import memberService from "../../service/memberServices";

const Register = () => {
  const [mid, setMid] = useState("");
  const [mpw, setMpw] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await memberService.register({ mid, mpw, name, email });
      navigate("/member/login"); // 회원가입 후 로그인 페이지로 이동
    } catch (err) {
      setError(err.message); // 회원가입 실패 시 에러 메시지 표시
    }
  };
  return (
    <div>
      <Header />
      <div className="signup-page">
        <h1>회원 가입</h1>
        <form onSubmit={handleRegister}>
          <div>
            <label htmlFor="mid">아이디:</label>
            <input
              type="text"
              id="mid"
              name="mid"
              value={mid}
              onChange={(e) => setMid(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="mpw">비밀번호:</label>
            <input
              type="password"
              id="mpw"
              name="mpw"
              value={mpw}
              onChange={(e) => setMpw(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="name">이름:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="email">이메일:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit">가입하기</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
};

export default Register;
