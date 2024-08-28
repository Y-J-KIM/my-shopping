import React, { useEffect, useState } from "react";
import Header from "../Home/Header";
import Footer from "../Home/Footer";

const Order = () => {
    const [order, setOrder] = useState([]);






    return (
        <div>
            <Header/>
            <div>
                <h1>My Order</h1>
            </div>
            <Footer/>
        </div>
    );
};

export default Order;