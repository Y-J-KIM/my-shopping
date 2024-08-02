// src/services/memberServices.js

import apiClient from "../utils/apiClient";

/**
 * 회원 가입 요청
 * @param {Object} memberData - 회원 가입에 필요한 데이터
 * @returns {Promise} - API 응답
 */
export const registerMember = async (memberData) => {
  try {
    const response = await apiClient.post("/member/join", memberData);
    return response.data;
  } catch (error) {
    console.error("Failed to register member:", error);
    throw error;
  }
};

/**
 * 로그인 페이지 요청 (에러와 로그아웃 정보를 포함할 수 있음)
 * @param {Object} params - 요청 파라미터 (error, logout 등)
 * @returns {Promise} - API 응답
 */
export const loginPage = async (params) => {
  try {
    const response = await apiClient.get("/member/login", { params });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch login page:", error);
    throw error;
  }
};
