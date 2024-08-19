import React, { useState } from "react";
<<<<<<< HEAD
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
=======
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
>>>>>>> f230fdaa703e39289c5282be11247cae90424d9d
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
<<<<<<< HEAD
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

=======
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
>>>>>>> f230fdaa703e39289c5282be11247cae90424d9d

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
<<<<<<< HEAD
            <label htmlFor="address"></label>
            <AddressInput onSave={(fullAddress) => setAddress(fullAddress)}/>
          </div>

=======
            <AddressInput onSave={handleSaveAddress} />
          </div>
>>>>>>> f230fdaa703e39289c5282be11247cae90424d9d
          <button type="submit">가입하기</button>
        </form>
        {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
      </div>
    </div>
  );
};

export default Register;
