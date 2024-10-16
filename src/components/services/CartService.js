import axios from "axios";
axios.defaults.withCredentials = true;

// API 엔드포인트 설정
const API_BASE_URL = "http://localhost:8080/api/cart";

// 장바구니 조회
export async function getCart(userId) {
  try {
      const response = await axios.get(`${API_BASE_URL}/${userId}`);
      return response.data;
  } catch (error) {
      console.error('Failed to fetch cart:', error);
      throw error;
  }
}

// 장바구니에 아이템 추가
export async function addItemToCart(userId, item) {
  try {
      const response = await axios.post(`${API_BASE_URL}/${userId}/items`, item, {
          headers: {
              'Content-Type': 'application/json',
              withCredentials: true
          },
      });
      return response.data;
  } catch (error) {
      console.error('Failed to add item to cart:', error);
      throw error;
  }
}

// 장바구니 아이템 수량 업데이트
export async function updateCartItemQuantity(userId, itemId, quantity) {
  try {
      await axios.put(`${API_BASE_URL}/${userId}/items/${itemId}?quantity=${quantity}`);
  } catch (error) {
      console.error('Failed to update item quantity:', error);
      throw error;
  }
}

// 장바구니에서 아이템 제거
export async function removeCartItem(userId, itemId) {
  try {
      await axios.delete(`${API_BASE_URL}/${userId}/items/${itemId}`);
  } catch (error) {
      console.error('Failed to remove item from cart:', error);
      throw error;
  }
}

