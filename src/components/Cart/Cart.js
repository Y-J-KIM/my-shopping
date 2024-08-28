import React, { useEffect, useState } from "react";
import CartService from "../services/CartService";

const Cart = ({ userId }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await CartService.loadCart(userId);
        setCart(data);
      } catch (error) {
        console.error("Failed to load cart:", error);
      }
    };

    fetchCart();
  }, [userId]);

  return (
    <div>
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <ul>
          {cart.items.map((item) => (
            <li key={item.productId}>
              {item.productName} - {item.quantity} x ${item.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
