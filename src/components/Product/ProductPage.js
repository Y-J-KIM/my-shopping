import React from "react";
import ProductList from "./ProductList";
import Header from "../Home/Header";
import Sidebar from "./Sidebar"; // Sidebar 컴포넌트 임포트
import "./ProductPage.css"; // CSS 파일 임포트

const ProductPage = () => {
  return (
    <section className="products_page">
      <Header />
      <div className="content">
        <Sidebar /> {/* Sidebar 컴포넌트 사용 */}
        <ProductList />
      </div>
    </section>
  );
};

export default ProductPage;
