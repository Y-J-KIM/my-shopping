// src/components/ProductList.js

import React, { useEffect, useState } from "react";
import { fetchProducts } from "../../service/productServices";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
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
      <h1>Product List</h1>
      <ul>
        {products.length === 0 ? (
          <li>No products available</li>
        ) : (
          products.map((product) => (
            <li key={product.id}>
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <p>Stock: {product.stock}</p>
              <p>Status: {product.inSoldout ? "Sold Out" : "Available"}</p>
              {product.image && <img src={product.image} alt={product.name} />}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ProductList;
