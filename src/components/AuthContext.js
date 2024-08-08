// AuthContext.js
import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // 사용자 정보 상태
  const [loading, setLoading] = useState(true); // 로딩 상태

  // 로그인 API 호출 함수
  const login = async (credentials) => {
    try {
      const response = await fetch("/api/member/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json(); // 텍스트로 응답 처리
      setUser(data.member);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  // 로그아웃 API 호출 함수
  const logout = async () => {
    try {
      await fetch("/api/member/logout", { method: "POST" });
      setUser(null); // 사용자 정보 초기화
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
