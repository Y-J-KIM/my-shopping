import React, { useState } from "react";
import apiClient from "./apiClient";

const Order = () => {
  const [cartItems, setCartItems] = useState([]); // 초기값 설정
  const [address, setAddress] = useState("");

  const handleOrderSubmit = async (event) => {
    event.preventDefault();
    try {
      await apiClient.post("/orders", {
        address,
        cartItems, // 주문하는 카트 아이템 목록
      });
      alert("Order placed successfully");
    } catch (error) {
      console.error("Error placing order", error);
    }
  };

  return (
    <div>
      <h1>Order Page</h1>
      <form onSubmit={handleOrderSubmit}>
        <div>
          <label>Shipping Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default Order;
