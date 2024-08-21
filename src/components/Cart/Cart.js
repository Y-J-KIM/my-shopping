import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../Home/Header';

const Cart = () => {
    const [cart, setCart] = useState(null);
    const [userId, setUserId] = useState(1); // 로그인된 사용자 ID를 동적으로 받아와야 합니다.

    useEffect(() => {
        // 사용자의 ID를 통해 장바구니를 가져옵니다.
        axios.get(`/api/cart?userId=${userId}`, { withCredentials: true })
            .then(response => {
                setCart(response.data);
            })
            .catch(error => {
                console.error('Error fetching cart:', error);
            });
    }, [userId]); // userId가 변경될 때마다 useEffect 실행

    const handleAddItem = (productId, quantity) => {
        // 장바구니에 항목 추가
        axios.post('/api/cart/add', {
            userId: userId,
            productId: productId,
            quantity: quantity
        }, {
            withCredentials: true
        })
        .then(response => {
            setCart(response.data);
        })
        .catch(error => {
            console.error('Error adding item to cart:', error);
        });
    };

    const handleRemoveItem = (cartItemId) => {
        // 장바구니에서 항목 제거
        axios.delete(`/api/cart/remove/${cartItemId}`, {
            withCredentials: true
        })
        .then(response => {
            setCart(response.data);
        })
        .catch(error => {
            console.error('Error removing item from cart:', error);
        });
    };

    const handleUpdateQuantity = (cartItemId, newQuantity) => {
        // 장바구니 항목 수량 업데이트
        axios.put(`/api/cart/update/${cartItemId}`, {
            quantity: newQuantity
        }, {
            withCredentials: true
        })
        .then(response => {
            setCart(response.data);
        })
        .catch(error => {
            console.error('Error updating item quantity:', error);
        });
    };

    return (
        <div>
            <Header/>
            <div>
                <h1>My Cart</h1>
                {cart ? (
                    <ul>
                        {cart.items.map(item => (
                            <li key={item.id}>
                                Product ID: {item.productId}, Quantity: {item.quantity}
                                <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
                                <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>Increase Quantity</button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Loading cart...</p>
                )}
            </div>
        </div>
    );
};

export default Cart;
