import axios from "axios";

const API_URL = "http://localhost:8080/api/member";

const register = async (memberData) => {
  try {
    const response = await axios.post(`${API_URL}/join`, memberData);
    return response.data;
  } catch (error) {
    console.error(
      "Registration error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const login = async (loginData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, loginData);
    return response.data;
  } catch (error) {
    console.error(
      "Login error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const logout = async () => {
  try {
    const response = await axios.post(`${API_URL}/logout`);
    return response.data;
  } catch (error) {
    console.error(
      "Logout error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const getLoginStatus = async () => {
  try {
    const response = await axios.get(`${API_URL}/loginStatus`);
    return response.data;
  } catch (error) {
    console.error(
      "Login status error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// 객체를 변수에 할당한 후 기본(default) 내보내기
const memberService = {
  register,
  login,
  logout,
  getLoginStatus,
};

export default memberService;
