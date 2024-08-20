import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./ProductList.css"

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 제품 목록을 서버에서 가져오는 함수
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/api/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []); // 빈 배열을 전달하여 컴포넌트가 처음 마운트될 때만 실행됨

    if (loading) {
        return <div>Loading...</div>;
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
                    className="product-image"
                  />
                )}
                <div className="product-info">
                  <h3 className="product-name">
                    <Link
                      to={`/products/${product.id}`}
                      className="product-detail-link"
                    >
                      {product.name}
                    </Link>
                  </h3>

                  <p className="product-price">{Intl.NumberFormat().format(product.price)} 원</p>

                  {/* <p className="product-status">
                    Status: {product.inSoldout ? "Sold Out" : "Available"}
                  </p> */}
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
