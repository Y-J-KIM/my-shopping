import React, { useEffect, useState } from "react";
import apiClient from "./apiClient";

const Cart = () => {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await apiClient.get("/cart");
        setCart(response.data);
      } catch (error) {
        console.error("Error fetching cart data", error);
      }
    };

    fetchCart();
  }, []);

  const updateQuantity = async (itemId, quantity) => {
    try {
      const response = await apiClient.post("/cart/updateQuantity", {
        id: itemId,
        quantity,
      });
      setCart(response.data);
    } catch (error) {
      console.error("Error updating cart item quantity", error);
    }
  };

  if (!cart) return <div>Loading...</div>;

  return (
    <div>
      <h1>My Cart</h1>
      <ul>
        {cart.cartItems.map((item) => (
          <li key={item.id}>
            <p>
              {item.product.name} - {item.quantity}
            </p>
            <input
              type="number"
              value={item.quantity}
              onChange={(e) => updateQuantity(item.id, e.target.value)}
            />
          </li>
        ))}
      </ul>
      <button>Checkout</button>
    </div>
  );
};

export default Cart;
