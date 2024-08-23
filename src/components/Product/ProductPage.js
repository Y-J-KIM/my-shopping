import React from "react";
import ProductList from "./ProductList";
import Header from "../Home/Header";
import Footer from "../Home/Footer";
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
      <Footer />
    </section>
  );
};

export default ProductPage;
