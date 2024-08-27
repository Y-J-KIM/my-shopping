import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AddressInput from "./AddressInput";
import Header from "../Home/Header";
import Footer from "../Home/Footer";
import "./EditUser.css";

function EditUser() {
  const { userId } = useParams(); // URL에서 유저 ID를 가져옵니다.
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
  });
  const [address, setAddress] = useState("");

  // 컴포넌트가 처음 렌더링될 때 유저 정보를 불러옵니다.
  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        // 유저 정보를 상태로 설정
        setUser({
          name: data.name,
          email: data.email,
          password: "", // 보안상의 이유로 기존 비밀번호는 빈 칸으로 둡니다.
          address: data.address,
        });
      });
  }, [userId]);

  // 폼 필드의 변경을 처리합니다.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // 폼 제출을 처리합니다.
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/api/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((response) => {
      if (response.ok) {
        alert("User updated successfully!");
      } else {
        alert("Failed to update user.");
      }
    });
  };

  return (
    <div>
      <Header />
      <div className="edit-page">
        <h1>회원정보수정</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              Password:
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                placeholder="Enter new password"
              />
            </label>
          </div>
          <div>
            <label htmlFor="address"></label>
            <AddressInput onSave={(fullAddress) => setAddress(fullAddress)} />
          </div>
          <div className="button">
            <button type="submit">수정 완료</button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default EditUser;
