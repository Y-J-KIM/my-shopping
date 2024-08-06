// src/services/replyServices.js

import apiClient from "../utils/api-client";

/**
 * 댓글을 등록합니다.
 * @param {Object} replyDTO - 댓글 정보
 * @returns {Promise} - API 응답
 */
export const addReply = async (replyDTO) => {
  try {
    const response = await apiClient.post("/replies/", replyDTO, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to add reply:", error);
    throw error;
  }
};

/**
 * 특정 게시물의 댓글 목록을 가져옵니다.
 * @param {number} bno - 게시물 ID
 * @param {Object} pageRequestDTO - 페이지 요청 정보
 * @returns {Promise} - API 응답
 */
export const getReplies = async (bno, pageRequestDTO) => {
  try {
    const response = await apiClient.get(`/replies/list/${bno}`, {
      params: pageRequestDTO,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch replies:", error);
    throw error;
  }
};

/**
 * 특정 댓글을 조회합니다.
 * @param {number} rno - 댓글 ID
 * @returns {Promise} - API 응답
 */
export const getReplyById = async (rno) => {
  try {
    const response = await apiClient.get(`/replies/${rno}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch reply with id ${rno}:`, error);
    throw error;
  }
};

/**
 * 댓글을 수정합니다.
 * @param {number} rno - 댓글 ID
 * @param {Object} replyDTO - 수정할 댓글 정보
 * @returns {Promise} - API 응답
 */
export const updateReply = async (rno, replyDTO) => {
  try {
    await apiClient.put(`/replies/${rno}`, replyDTO, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(`Failed to update reply with id ${rno}:`, error);
    throw error;
  }
};

/**
 * 댓글을 삭제합니다.
 * @param {number} rno - 댓글 ID
 * @returns {Promise} - API 응답
 */
export const deleteReply = async (rno) => {
  try {
    await apiClient.delete(`/replies/${rno}`);
  } catch (error) {
    console.error(`Failed to delete reply with id ${rno}:`, error);
    throw error;
  }
};
