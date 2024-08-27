import axios from "axios";

const API_URL = "/api/cart";

export const getCartItems = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/items`, {
      params: { userId },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching cart items:", error);
    throw error;
  }
};

export const addItemToCart = async (productId, quantity) => {
  try {
    const response = await axios.post(
      `${API_URL}/add`,
      { productId, quantity },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding item to cart:", error);
    throw error;
  }
};

export const updateCartItemQuantity = async (itemId, quantity) => {
  try {
    const response = await axios.post(`${API_URL}/updateQuantity`, null, {
      params: { id: itemId, quantity },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating cart item quantity:", error);
    throw error;
  }
};

export const removeCartItem = async (itemId) => {
  try {
    const response = await axios.delete(`${API_URL}/items/remove/${itemId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error removing cart item:", error);
    throw error;
  }
};
