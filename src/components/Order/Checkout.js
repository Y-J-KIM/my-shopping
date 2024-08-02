// src/components/Order/Checkout.js

import React, { useEffect, useState } from "react";
import { getCartForOrder, completeOrder } from "../../services/orderServices";

const Checkout = () => {
  const [cart, setCart] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartData = await getCartForOrder();
        setCart(cartData);
      } catch (err) {
        setError("장바구니를 불러오는 데 실패했습니다.");
      }
    };

    fetchCart();
  }, []);

  const handleCompleteOrder = async () => {
    try {
      await completeOrder();
      setMessage("주문이 완료되었습니다.");
    } catch (err) {
      setError("주문 처리에 실패했습니다.");
    }
  };

  return (
    <div>
      <h2>주문 확인</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}
      {cart ? (
        <div>
          <h3>장바구니</h3>
          <ul>
            {cart.cartItems.map((item) => (
              <li key={item.id}>
                {item.productName} - {item.quantity}
              </li>
            ))}
          </ul>
          <button onClick={handleCompleteOrder}>주문 완료</button>
        </div>
      ) : (
        <p>장바구니를 불러오는 중...</p>
      )}
    </div>
  );
};

export default Checkout;
