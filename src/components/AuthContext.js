// import React, { createContext, useContext, useState, useEffect } from "react";
// import axios from "axios";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const loadUserFromLocalStorage = () => {
//       try {
//         const savedUser = localStorage.getItem("user");
//         if (savedUser) {
//           const parsedUser = JSON.parse(savedUser);
//           if (parsedUser && parsedUser.userId) {
//             setUser(parsedUser);
//           }
//         }
//       } catch (error) {
//         console.error("로컬 스토리지에서 사용자 로드 오류", error);
//         localStorage.removeItem("user");
//       }
//     };

//     loadUserFromLocalStorage();
//   }, []);

//   const login = async (userId, password) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:8080/api/users/login",
//         null,
//         {
//           params: { userId, password },
//         }
//       );

//       // 서버 응답 검증
//       if (response.status === 200 && response.data.success) {
//         const { user } = response.data;
//         setUser(user);
//         localStorage.setItem("user", JSON.stringify(user));
//         return { success: true };
//       } else {
//         console.error("로그인 실패: 잘못된 자격 증명");
//         return {
//           success: false,
//           message: response.data.message || "Login failed",
//         };
//       }
//     } catch (error) {
//       console.error("로그인 실패", error);
//       return { success: false, message: "Login failed due to server error" };
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("user");
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

import React, { useContext, createContext } from "react";
import { useUser } from "./UserContext"; // UserProvider에서 user 정보를 가져옴

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { user, login, logout } = useUser(); // UserProvider에서 user와 함수 가져오기
  const loading = false; // 로딩 상태를 UserProvider에서 관리하는 경우

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
