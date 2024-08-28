import axios from "axios";
axios.defaults.withCredentials = true;

// API 엔드포인트 설정
const API_URL = "http://localhost:8080/api/cart";

const CartService = {
  addItemToCart: async (userId, productId, quantity) => {
    try {
      await axios.post(`${API_URL}/${userId}/items`, { productId, quantity });
    } catch (error) {
      console.error("Error adding item to cart:", error);
      throw error;
    }
  },

  loadCart: async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/${userId}/load`);
      return response.data;
    } catch (error) {
      console.error("Error loading cart:", error);
      throw error;
    }
  },
};

export default CartService;
