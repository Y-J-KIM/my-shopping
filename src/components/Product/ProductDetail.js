// ProductDetail.js

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../../service/productServices";
import Header from "../Home/Header";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (err) {
        setError(err.message || "Failed to fetch product details");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]); // ID가 변경될 때마다 호출

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <Header />
      <div className="product-detail">
        <h1>{product.name}</h1>
        <img
          src={product.image}
          alt={product.name}
          className="product-detail-image"
        />
        <p>{product.description}</p>
        <p>Price: ${product.price}</p>
        <p>Stock: {product.stock}</p>
        <p>Status: {product.inSoldout ? "Sold Out" : "Available"}</p>
      </div>
    </div>
  );
};

export default ProductDetail;
