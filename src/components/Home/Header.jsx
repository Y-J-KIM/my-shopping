import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const { user, setUser } = useAuth(); // 로그인 상태와 로그아웃 함수 가져오기
  const navigate = useNavigate();

  const logout = async () => {
    try {
      // 서버에 로그아웃 요청
      await axios.post("/api/member/logout");
      // 사용자 상태를 초기화
      setUser(null);
      navigate("/");
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
                {/* <button onClick={logout}>Logout</button> */}
                <Link to="/member/logout" onClick={logout}>
                  로그아웃
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
