import React, { useEffect, useState } from "react";
import apiClient from "../../utils/api-client";
import Header from "../Home/Header";

/**
 * 장바구니 컴포넌트
 */
const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  // 장바구니 데이터 로드
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await apiClient.get("/cart/items");
        setCart(response.data);
      } catch (error) {
        console.error("Error fetching cart data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  // 수량 업데이트
  const updateQuantity = async (itemId, quantity) => {
    const newQuantity = parseInt(quantity, 10);

    if (isNaN(newQuantity) || newQuantity < 1) {
      alert("Quantity must be a positive number.");
      return;
    }

    try {
      await apiClient.post("/cart/cart/updateQuantity", null, {
        params: { id: itemId, quantity: newQuantity },
      });
      // 상태를 새로고침하거나 다시 요청할 수 있음
      const response = await apiClient.get("/cart/items");
      setCart(response.data);
    } catch (error) {
      console.error("Error updating cart item quantity", error);
    }
  };

  // 장바구니가 로딩 중일 때
  if (loading) return <div>Loading...</div>;

  // 장바구니가 비어 있을 때
  if (!cart || cart.cartItems.length === 0)
    return (
      <div>
        <Header />
        <div>Your cart is empty</div>
      </div>
    );

  return (
    <div>
      <Header />
      <h1>My Cart</h1>
      <ul>
        {cart.cartItems.map((item) => (
          <li key={item.id}>
            <p>
              {item.product.name} - ${item.product.price} - {item.quantity}
            </p>
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) => updateQuantity(item.id, e.target.value)}
            />
          </li>
        ))}
      </ul>
      <button onClick={() => alert("Proceeding to checkout")}>Checkout</button>
    </div>
  );
};

export default Cart;
