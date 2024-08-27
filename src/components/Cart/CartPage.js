// src/pages/CartPage.js
import React, { useEffect, useState } from "react";
import "./CartPage.css"; // 스타일 파일을 추가합니다.
import Header from "../Home/Header";
import Footer from "../Home/Footer";
import { useUser } from "../UserContext";
import { useNavigate } from "react-router-dom";
import {
  getCartItems,
  updateCartItemQuantity,
  removeCartItem,
} from "../services/CartService";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const { user } = useUser(); // 로그인된 사용자 정보 가져오기
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const data = await getCartItems(user.id);
      setCartItems(data.items);
      calculateTotalAmount(data.items);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const calculateTotalAmount = (items) => {
    const total = items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    setTotalAmount(total);
  };

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    try {
      await updateCartItemQuantity(itemId, newQuantity);
      fetchCartItems(); // 업데이트 후 다시 아이템 목록 불러오기
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      await removeCartItem(itemId);
      fetchCartItems(); // 삭제 후 다시 아이템 목록 불러오기
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  return (
    <div>
      <Header />
      <div className="container">
        <h1>Your Cart</h1>
        <div id="cart-items">
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.product.imageUrl} alt={item.product.name} />
                <div className="cart-item-details">
                  <h3>{item.product.name}</h3>
                  <p>Price: ${item.product.price}</p>
                  <div className="cart-item-actions">
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      onChange={(e) =>
                        handleUpdateQuantity(item.id, parseInt(e.target.value))
                      }
                    />
                    <button
                      onClick={() =>
                        handleUpdateQuantity(item.id, item.quantity)
                      }
                    >
                      Update
                    </button>
                    <button onClick={() => handleRemoveItem(item.id)}>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div id="cart-summary">
          <h2>Cart Summary</h2>
          <p id="total-amount">Total: ${totalAmount.toFixed(2)}</p>
          <button
            id="checkout-button"
            onClick={() => alert("Proceeding to checkout")}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default CartPage;
