import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "./Header.css";

const Header = ({ cartCount }) => {
  const { user, logout, loading } = useAuth(); // 로그인 상태와 로그아웃 함수 가져오기

  return (
    <header>
      <div className="logo">MyShop</div>
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/products">Products</a>
          </li>
          <li>
            <a href="/board/list">Board</a>
          </li>
          {!user ? (
            <>
              <li>
                <Link to="/member/login">Login</Link>
              </li>
              <li>
                <Link to="/member/join">Join</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/myorders">내 주문</Link>
              </li>
              <li>
                <Link to="/cart" className="align_center">
                  장바구니{" "}
                  <p className="align_center cart_counts">{cartCount}</p>
                </Link>
              </li>
              <li>
                <button onClick={logout}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
