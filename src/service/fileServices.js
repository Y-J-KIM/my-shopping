// src/services/fileServices.js

import apiClient from "../utils/apiClient";

/**
 * 파일을 업로드합니다.
 * @param {FormData} formData - 업로드할 파일을 포함한 FormData 객체
 * @returns {Promise} - 업로드 결과
 */
export const uploadFiles = async (formData) => {
  try {
    const response = await apiClient.post("/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to upload files:", error);
    throw error;
  }
};

/**
 * 파일을 조회합니다.
 * @param {string} fileName - 파일 이름
 * @returns {Promise} - 파일의 Blob 데이터
 */
export const fetchFile = async (fileName) => {
  try {
    const response = await apiClient.get(`/view/${fileName}`, {
      responseType: "blob",
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch file ${fileName}:`, error);
    throw error;
  }
};

/**
 * 파일을 삭제합니다.
 * @param {string} fileName - 파일 이름
 * @returns {Promise} - 삭제 결과
 */
export const deleteFile = async (fileName) => {
  try {
    const response = await apiClient.delete(`/remove/${fileName}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to delete file ${fileName}:`, error);
    throw error;
  }
};
