// UserContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/user/me"); // 사용자의 정보를 가져오는 API 호출
        setUser(response.data); // 예시로 { id: '123', name: 'John Doe' } 형태의 데이터 설정
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch user", error);
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // 로그인 시 사용자 정보를 설정하는 함수
  const login = (userData) => {
    setUser(userData);
  };

  // 로그아웃 시 사용자 정보를 제거하는 함수
  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
