// UserContext.js
import React, { createContext, useState, useContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

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
