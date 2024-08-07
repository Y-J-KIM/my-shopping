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

      if (response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token); // 토큰 저장
      setUser(data.member); // 사용자 정보 저장
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  // 로그아웃 API 호출 함수
  const logout = async () => {
    try {
      await fetch("/api/member/logout", { method: "POST" });
      localStorage.removeItem("token"); // 토큰 제거
      setUser(null); // 사용자 정보 초기화
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // 사용자 상태를 확인하는 API 호출
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await fetch("/api/member/status", {
            headers: {
              Authorization: `Bearer ${token}`, // 토큰 포함
            },
          });
          if (response.ok) {
            const data = await response.json();
            setUser(data.member); // 사용자 정보 저장
          } else {
            setUser(null); // 사용자 정보 초기화
          }
        } catch (error) {
          console.error("Failed to fetch user status:", error);
          setUser(null); // 사용자 정보 초기화
        }
      }
      setLoading(false); // 로딩 완료
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
