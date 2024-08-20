import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "./Header.css";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

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
                <Link to="/users/login">Login</Link>
              </li>
              <li>
                <Link to="/users/register">Join</Link>
              </li>
              <li>
                <Link to="/admin/product">관리자</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/myorders">내 주문</Link>
              </li>
              <li>
                <Link to="/cart" className="align_center">
                  장바구니
                </Link>
              </li>
              <li>
                <a href="/member/logout" onClick={handleLogout}>
                  로그아웃
                </a>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
