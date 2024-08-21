import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../UserContext"; // useUser 임포트
import "./Header.css";

const Header = () => {
  const { user, setUser } = useUser(); // useUser 훅을 사용하여 user와 setUser 가져오기
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      // 로그아웃 API 호출 (여기서는 로그아웃 처리 로직을 직접 추가해야 합니다)
      await fetch("/api/users/logout", { method: "POST" });

      // Context에서 user 정보 제거
      setUser(null);

      // 홈 페이지로 리디렉션
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <header>
      <div className="logo">MyShop</div>
      {user && (
        <div className="greeting-container">
          <span className="greeting">안녕하세요, {user.username}님</span>
        </div>
      )}
      <nav>
        <ul>
          {/* 로그인하지 않은 상태 */}
          {!user ? (
            <>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/products">Products</Link>
              </li>
              <li>
                <Link to="/board/list">Board</Link>
              </li>
              <li>
                <Link to="/users/login">Login</Link>
              </li>
              <li>
                <Link to="/users/register">Join</Link>
              </li>
            </>
          ) : user.roles.includes("ROLE_ADMIN") ? (
            /* 관리자 상태 */
            <>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/products">Products</Link>
              </li>
              <li>
                <Link to="/board/list">Board</Link>
              </li>
              <li>
                <Link to="/" onClick={handleLogout}>
                  Logout
                </Link>
              </li>
              <li>
                <Link to="/admin/product">Admin</Link>
              </li>
            </>
          ) : (
            /* 일반 사용자 상태 */
            <>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/products">Products</Link>
              </li>
              <li>
                <Link to="/board/list">Board</Link>
              </li>
              <li>
                <Link to="/myorders">내 주문</Link>
              </li>
              <li>
                <Link to="/cart" className="align_center">
                  장바구니
                </Link>
              </li>
              <li>
                <Link to="/" onClick={handleLogout}>
                  Logout
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
