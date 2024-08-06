import React from "react";
import ProductList from "./ProductList";
import Header from "../Home/Header";

const ProductPage = () => {
  return (
    <section className="products_page">
      <Header />
      <ProductList />
    </section>
  );
};

export default ProductPage;
