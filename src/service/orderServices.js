// src/services/orderServices.js

import apiClient from "../utils/api-client";

/**
 * 장바구니를 조회하여 주문 페이지를 준비합니다.
 * @returns {Promise} - API 응답
 */
export const getCartForOrder = async () => {
  try {
    const response = await apiClient.get("/order");
    return response.data;
  } catch (error) {
    console.error("Failed to get cart for order:", error);
    throw error;
  }
};

/**
 * 주문을 완료합니다.
 * @returns {Promise} - API 응답
 */
export const completeOrder = async () => {
  try {
    const response = await apiClient.post("/order/complete");
    return response.data;
  } catch (error) {
    console.error("Failed to complete order:", error);
    throw error;
  }
};
