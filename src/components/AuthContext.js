// src/AuthContext.js
import React, { createContext, useState, useContext } from "react";
import {
  loginMember,
  fetchUserInfo,
  logoutMember,
} from "../service/memberServices";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // 사용자 정보 상태
  const [loading, setLoading] = useState(false); // 로딩 상태

  // 로그인 함수
  const login = async (credentials) => {
    //console.log(credentials);
    setLoading(true);
    try {
      const response = await loginMember(credentials);
      setUser(response.data); // 사용자 정보 저장
      //window.location.href = "/";
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // 로그아웃 API 호출 함수
  const logout = async () => {
    try {
      await logoutMember();
      setUser(null);
      window.localStorage.href("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
