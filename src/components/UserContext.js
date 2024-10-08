import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

// UserContext 생성
const UserContext = createContext();

// UserProvider 컴포넌트
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 애플리케이션이 로드될 때 현재 사용자 정보를 가져오는 함수
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
          setUser(JSON.parse(savedUser));
          setLoading(false);
        } else {
          const response = await axios.get("/api/", { withCredentials: true });
          setUser(response.data); // 사용자 정보 설정
          localStorage.setItem("user", JSON.stringify(response.data)); // 로컬 스토리지에 저장
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setUser(null);
        } else {
          console.error("Failed to fetch current user", error);
          setError(error); // 다른 오류는 기록
        }
      } finally {
        setLoading(false); // 로딩 상태 종료
      }
    };

    fetchUser();
  }, []);

  // 로그인 함수
  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post("/api/users/login", credentials, {
        withCredentials: true, // 쿠키를 전송하기 위해 설정
      });
      setUser(response.data); // 로그인된 사용자 정보 설정
      localStorage.setItem("user", JSON.stringify(response.data)); // 로컬 스토리지에 저장
    } catch (error) {
      console.error("Login failed", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  // 로그아웃 함수
  const logout = async () => {
    setLoading(true);
    setError(null);
    try {
      await axios.post("/api/users/logout", {}, { withCredentials: true }); // 세션 무효화
      setUser(null); // 사용자 정보 초기화
      localStorage.removeItem("user"); // 로컬 스토리지에서 사용자 정보 제거
    } catch (error) {
      console.error("Logout failed", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{ user, loading, error, login, logout, setUser }}
    >
      {!loading && children} {/* 로딩이 끝난 후에만 자식 컴포넌트를 렌더링 */}
    </UserContext.Provider>
  );
};

// useUser Hook
export const useUser = () => useContext(UserContext);
