// src/pages/CartPage.js
import React, { useEffect, useState } from "react";
import "./CartPage.css"; // 스타일 파일을 추가합니다.
import Header from "../Home/Header";
import Footer from "../Home/Footer";
import { useUser } from "../UserContext";
import { useNavigate } from "react-router-dom";
import { getCart, addItemToCart, updateCartItemQuantity, removeCartItem } from '../services/CartService';

const CartPage = ({ userId }) => {
  const [cart, setCart] = useState(null);
  const [newItem, setNewItem] = useState({ product: { id: '' }, quantity: 1 });

  useEffect(() => {
      async function fetchCart() {
          try {
              const fetchedCart = await getCart(userId);
              setCart(fetchedCart);
          } catch (error) {
              console.error('Error fetching cart:', error.message);
          }
      }

      fetchCart();
  }, [userId]);

  const handleAddItem = async () => {
      try {
          await addItemToCart(userId, newItem);
          // 장바구니 새로고침
          const updatedCart = await getCart(userId);
          setCart(updatedCart);
      } catch (error) {
          console.error('Error adding item to cart:', error.message);
      }
  };

  const handleUpdateQuantity = async (itemId, quantity) => {
      try {
          await updateCartItemQuantity(userId, itemId, quantity);
          // 장바구니 새로고침
          const updatedCart = await getCart(userId);
          setCart(updatedCart);
      } catch (error) {
          console.error('Error updating item quantity:', error.message);
      }
  };

  const handleRemoveItem = async (itemId) => {
      try {
          await removeCartItem(userId, itemId);
          // 장바구니 새로고침
          const updatedCart = await getCart(userId);
          setCart(updatedCart);
      } catch (error) {
          console.error('Error removing item from cart:', error.message);
      }
  };

  if (!cart) return <div>Loading...</div>;


  return (
    <div>
      <Header />
      <div className="cart-main">
            <h1>My Cart</h1>
            <ul>
                {cart.items.map(item => (
                    <li key={item.id}>
                        {item.product.name} - {item.quantity}
                        <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>Increase</button>
                        <button onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}>Decrease</button>
                        <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
                    </li>
                ))}
            </ul>
            <div>
                <input
                    type="number"
                    value={newItem.quantity}
                    onChange={e => setNewItem({ ...newItem, quantity: parseInt(e.target.value, 10) })}
                />
                <input
                    type="text"
                    value={newItem.product.id}
                    onChange={e => setNewItem({ ...newItem, product: { id: e.target.value } })}
                />
                <button onClick={handleAddItem}>Add Item</button>
            </div>
        </div>
      <Footer />
    </div>
  );
};
export default CartPage;
