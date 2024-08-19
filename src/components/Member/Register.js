import React, { useState } from "react";
import { registerMember } from "../../service/memberServices";
import "./Register.css";
import Header from "../Home/Header";
import { useNavigate } from "react-router-dom";
import AddressInput from "./AddressInput";

const Register = () => {
  const [mid, setMid] = useState("");
  const [mpw, setMpw] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await registerMember({ mid, mpw, name, email, address });
      navigate("/member/login"); // 회원가입 후 로그인 페이지로 이동
    } catch (err) {
      setError(err.message); // 회원가입 실패 시 에러 메시지 표시
    }
  };

  const handleSaveAddress = (address) => {
    // 백엔드로 주소를 전송하는 로직
    const member = {
      name: name,
      address: address, // 전체 주소를 Member 엔티티의 address 필드에 저장
    };

    // 예시로 fetch를 통해 주소 저장 API 호출
    fetch("/api/members", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(member),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Member saved:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
          <div>
            <AddressInput onSave={handleSaveAddress} />
          </div>
          <button type="submit">가입하기</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
};

export default Register;
