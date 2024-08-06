import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "./Header.css";

const Header = () => {
  const { isAuthenticated, logout } = useAuth(); // 로그인 상태와 로그아웃 함수 가져오기

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
          {!isAuthenticated ? (
            <>
              <li>
                <Link to="/member/login">Login</Link>
              </li>
              <li>
                <Link to="/member/join">Join</Link>
              </li>
            </>
          ) : (
            <li>
              <button onClick={logout}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
