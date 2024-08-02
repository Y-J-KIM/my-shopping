// src/services/homeServices.js

import apiClient from "../utils/apiClient";

/**
 * 홈 페이지에서 사용자 정보를 가져옵니다.
 * @returns {Promise<Object>} - 사용자 정보
 */
export const fetchUserInfo = async () => {
  try {
    const response = await apiClient.get("/");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user info:", error);
    throw error;
  }
};
