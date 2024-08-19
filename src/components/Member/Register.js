// src/components/Member/Register.js

import React, { useState } from "react";
import "./Register.css";
import Header from "../Home/Header";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import AddressInput from "./AddressInput";

function Register() {
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/users/register', {
        userId, username, email, password, address
      });

      if (response.status === 200) {
        alert('Registration successful!');
        navigate('/login');
      }
    } catch (error) {
      alert('Registration failed. Try again.');
    }
  };


  return (
    <div>
      <Header />
      <div className="signup-page">
        <h1>회원 가입</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="userId">아이디:</label>
            <input
              type="text"
              // id="mid"
              // name="mid"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">비밀번호:</label>
            <input
              type="password"
              // id="mpw"
              // name="mpw"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="username">이름:</label>
            <input
              type="text"
              // id="name"
              // name="name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
          <div>
            <label htmlFor="address"></label>
            <AddressInput onSave={(fullAddress) => setAddress(fullAddress)}/>
          </div>

          <button type="submit">가입하기</button>
        </form>
        {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
      </div>
    </div>
  );
};

export default Register;