import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
import Header from "../Home/Header";
import Footer from "../Home/Footer";
import "./MyOrder.css"

export default function MyOrder() {
  return (
    <div>
      <Header />
      <div className="order-main">
        <h1>주문목록</h1>
        <table className="order-table">
            <thead>
                <tr>
                    <th>주문 번호</th>
                    <th>금액</th>
                    <th>주문 날짜</th>                    
                    <th></th>
                </tr>
            </thead>
            <tbody>

                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tbody>
        </table>
      </div>
      <Footer />
    </div>
  )
}
