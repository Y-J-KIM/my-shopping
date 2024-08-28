import React, { useState } from "react";

const CartItem = ({ item, onUpdateQuantity, onRemoveItem }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleUpdateClick = () => {
    onUpdateQuantity(item.id, quantity);
  };

  const handleRemoveClick = () => {
    onRemoveItem(item.id);
  };

  return (
    <li>
      <h3>{item.productName}</h3>
      <p>Price: ${item.price}</p>
      <input
        type="number"
        value={quantity}
        onChange={handleQuantityChange}
        min="1"
      />
      <button onClick={handleUpdateClick}>Update Quantity</button>
      <button onClick={handleRemoveClick}>Remove</button>
    </li>
  );
};

export default CartItem;
