import React, { useEffect, useState } from "react";
import CartService from "../services/CartService";
import Header from "../Home/Header";
import Footer from "../Home/Footer";
import "./Cart.css"

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
      <Header/>
        <div>
          <h1>Your Cart</h1>
            <table className="cart-table">
              <thead>
                <tr>
                  <th>번호</th>
                  <th>제품</th>
                  <th>갯수</th>
                  <th>가격</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cart.length === 0 ? (
                  <tr>
                    <p>Cart is empty</p>
                  </tr>
                  ) : (              
                cart.items.map((item) => (
                <tr key={item.productId}>
                  <td>{item.productId}</td>
                  <td>{item.productName}</td> - 
                  <td>{item.quantity}</td>
                  <td>{item.price}</td>
                </tr>
                 ))
                )}
              </tbody>
            </table>
        </div>
      <Footer/>
    </div>
  );
};

export default Cart;
