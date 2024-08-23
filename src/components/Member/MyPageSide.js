import React from "react";
import "../Member/MyPageSide.css";
import { Link } from "react-router-dom";

const MyPageSide = () => {
  return (
    <aside className="sidebar">
      <h2>MyPage</h2>
      <ul className="text">
        <li>
          <Link to="/edit-user/:id">회원정보수정</Link>
        </li>
        <li>
          <Link to="/myorders">주문내역</Link>
        </li>
      </ul>
    </aside>
  );
};

export default MyPageSide;
