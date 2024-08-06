// src/components/ProductList.js

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProducts } from "../../service/productServices";
import "./ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        console.log("Fetched products:", data); //디버깅 로그
        setProducts(data);
      } catch (err) {
        setError(err.message || "Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []); // 컴포넌트 마운트 시 한 번만 호출

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="product-list">
        <h1>Product List</h1>
        <div className="product-cards">
          {products.length === 0 ? (
            <div>No products available</div>
          ) : (
            products.map((product) => (
              <div className="product-card" key={product.id}>
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                  />
                )}
                <div className="product-info">
                  <h2 className="product-name">
                    <Link
                      to={`/products/${product.id}`}
                      className="product-detail-link"
                    >
                      {product.name}
                    </Link>
                  </h2>

                  <p className="product-price">Price: ${product.price}</p>

                  <p className="product-status">
                    Status: {product.inSoldout ? "Sold Out" : "Available"}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
