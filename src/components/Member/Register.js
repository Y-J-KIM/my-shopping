// src/components/Member/Register.js

import React, { useState } from "react";
import { registerMember } from "../../service/memberServices";
import Header from "../Home/Header";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [error, setError] = useState("");

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
      await registerMember(formData);
      // 회원 가입 성공 후 처리 (예: 로그인 페이지로 리다이렉트)
      window.location.href = "/member/login";
    } catch (error) {
      setError("회원 가입에 실패했습니다.");
    }
  };

  return (
    <div>
      <Header />
      <div>
        <h2>회원 가입</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">사용자 이름:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password">비밀번호:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
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
            />
          </div>
          <button type="submit">회원 가입</button>
          {error && <p>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Register;
