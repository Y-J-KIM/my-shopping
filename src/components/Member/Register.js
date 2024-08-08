// src/components/Member/Register.js

import React, { useState } from "react";
import { registerMember } from "../../service/memberServices";
import "./Register.css";
import Header from "../Home/Header";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    mid: "",
    mpw: "",
    name: "",
    email: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerMember(formData);
      if (response.status === 200) {
        // 회원 가입 성공 시 로그인 페이지로 리디렉션
        navigate("/member/login");
      }
    } catch (error) {
      setError(error.response?.data || "회원 가입 실패");
    }
  };

  return (
    <div>
      <Header />
      <div className="signup-page">
        <h1>회원 가입</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="mid">아이디:</label>
            <input
              type="text"
              id="mid"
              name="mid"
              value={formData.mid}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="mpw">비밀번호:</label>
            <input
              type="password"
              id="mpw"
              name="mpw"
              value={formData.mpw}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="name">이름:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email">이메일:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
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
