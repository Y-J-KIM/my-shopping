import apiClient from "../utils/apiClient";

/**
 * 장바구니에 상품을 추가합니다.
 * @param {number} productId - 상품 ID
 * @param {number} quantity - 수량
 * @returns {Promise<void>}
 */
export const addToCart = (productId, quantity) =>
  apiClient.post("/cart/add", null, { params: { productId, quantity } });

/**
 * 장바구니 아이템의 수량을 업데이트합니다.
 * @param {number} productId - 상품 ID
 * @param {number} newQuantity - 새 수량
 * @returns {Promise<void>}
 */
export const updateCartItem = (productId, newQuantity) =>
  apiClient.post("/cart/update", null, {
    params: { productId, quantity: newQuantity },
  });

/**
 * 장바구니 아이템을 삭제합니다.
 * @param {number} itemId - 장바구니 아이템 ID
 * @returns {Promise<void>}
 */
export const removeCartItem = (itemId) =>
  apiClient.delete(`/cart/items/remove/${itemId}`);

/**
 * 장바구니의 모든 아이템을 가져옵니다.
 * @returns {Promise<Object>}
 */
export const fetchCartItems = () => apiClient.get("/cart/items");

/**
 * 장바구니 아이템의 수량을 업데이트합니다.
 * @param {number} id - 장바구니 아이템 ID
 * @param {number} quantity - 새 수량
 * @returns {Promise<void>}
 */
export const updateQuantity = (id, quantity) =>
  apiClient.post("/cart/cart/updateQuantity", null, {
    params: { id, quantity },
  });
