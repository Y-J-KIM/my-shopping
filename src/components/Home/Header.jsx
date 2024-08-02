import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header>
      <div className="logo">MyShop</div>
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/api/products">Products</a>
          </li>
          <li>
            <a href="/member/login">Login</a>
          </li>
          <li>
            <a href="/member/join">Join</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
