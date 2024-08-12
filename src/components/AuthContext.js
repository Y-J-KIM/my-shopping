// src/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import { login, checkLoginStatus } from "../service/memberServices";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // 사용자 정보 상태
  const [loading, setLoading] = useState(false); // 로딩 상태

  // // 로그인 함수
  // const login = async (credentials) => {
  //   //console.log(credentials);
  //   setLoading(true);
  //   try {
  //     const response = await loginMember(credentials);
  //     setUser(response);
  //     //setUser(response); // 사용자 정보 저장
  //     //window.location.href = "/";
  //   } catch (error) {
  //     console.error("Login error:", error);
  //     throw error;
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // // 로그인 함수
  // const login = async (mid, mpw) => {
  //   try {
  //     const data = await login(mid, mpw);
  //     setUser(data.mid); // 로그인 성공 시 사용자 정보를 상태에 저장
  //     localStorage.setItem("authToken", data.token); // 토큰을 로컬 스토리지에 저장 (필요시)
  //   } catch (error) {
  //     console.error("Login failed:", error);
  //     throw new Error("로그인 실패");
  //   }
  // };

  // // 로그아웃 API 호출 함수
  // const logout = async () => {
  //   try {
  //     await logoutMember();
  //     setUser(null);
  //     window.localStorage.href("/");
  //   } catch (error) {
  //     console.error("Logout error:", error);
  //   }
  // };

  // // 로그인 상태 유지 및 초기화
  // useEffect(() => {
  //   const initializeUser = async () => {
  //     setLoading(true);
  //     try {
  //       const userInfo = await checkLoginStatus();
  //       setUser(userInfo);
  //     } catch (error) {
  //       console.error("Failed to fetch user info:", error);
  //       // 인증 실패 시 사용자 상태를 null로 설정
  //       setUser(null);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   initializeUser();
  // }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, login, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
