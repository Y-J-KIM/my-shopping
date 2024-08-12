import React, { useEffect, useState } from "react";
import apiClient from "../../utils/api-client";
import Header from "../Home/Header";
import { getCartForOrder, completeOrder } from "../../service/orderServices"; // 수정된 서비스 import

const Order = () => {
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 장바구니 정보 로드
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const data = await getCartForOrder();
        setCartItems(data.cartItems);
      } catch (err) {
        setError("Failed to load cart items");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  // 주문 제출 처리
  const handleOrderSubmit = async (event) => {
    event.preventDefault();
    try {
      await completeOrder();
      alert("Order placed successfully");
      // 주문 완료 후 리다이렉트 또는 다른 처리를 할 수 있습니다
    } catch (error) {
      console.error("Error placing order", error);
      setError("Failed to place order");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (cartItems.length === 0) return <div>Your cart is empty</div>;

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.product.price,
    0
  );
  const shippingCost = 3000;
  const finalPrice = totalPrice + shippingCost;

  return (
    <div>
      <Header />
      <div className="container mt-5">
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

          <h2>Cart Items</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Image</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={item.id}>
                  <td>{item.product.name}</td>
                  <td>
                    <img
                      src={item.product.image}
                      alt="Product"
                      className="img-thumbnail"
                    />
                  </td>
                  <td>{item.quantity}</td>
                  <td>${item.product.price}</td>
                  <td>${item.quantity * item.product.price}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="cart-summary">
            <table className="table">
              <tbody>
                <tr>
                  <th>Subtotal</th>
                  <td>${totalPrice}</td>
                </tr>
                <tr>
                  <th>Shipping</th>
                  <td>${shippingCost}</td>
                </tr>
                <tr>
                  <th>Total</th>
                  <td>${finalPrice}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <button type="submit" className="btn btn-primary">
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default Order;
