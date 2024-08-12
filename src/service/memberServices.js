import axios from "axios";

/**
 * 사용자 로그인
 * @param {Object} credentials - 로그인 정보
 * @returns {Promise<Object>} - 로그인 성공 시 사용자 정보
 */
export const login = async (credentials) => {
  try {
    const response = await axios.post("/api/member/login", credentials);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Login failed");
  }
};

/**
 * 사용자 회원가입
 * @param {Object} userData - 회원가입 정보
 * @returns {Promise<void>}
 */
export const register = async (userData) => {
  try {
    await axios.post("/api/member/join", userData);
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error("Registration failed");
  }
};

/**
 * 로그아웃
 * @returns {Promise<void>}
 */
export const logout = async () => {
  try {
    await axios.post("/api/member/logout");
  } catch (error) {
    throw error.response ? error.response.data : new Error("Logout failed");
  }
};

/**
 * 로그인 상태 확인
 * @returns {Promise<string>}
 */
export const checkLoginStatus = async () => {
  try {
    const response = await axios.get("/api/member/loginStatus");
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error("Failed to check login status");
  }
};
