// ProductDetail.js

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../../service/productServices";
import { addReview, getReviewsByProductId } from "../../service/reviewServices";
import Header from "../Home/Header";
import "./ProductDetail.css";
import { getLoginStatus } from "../../service/memberServices";
import memberService from "../../service/memberServices";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [username, setUsername] = useState("");
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ comment: "", rating: 5 });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProductById(id);
        setProduct(data);

        const reviewsData = await getReviewsByProductId(id);
        setReviews(reviewsData);
      } catch (err) {
        setError(err.message || "Failed to fetch product details");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, []);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const newReviewId = await addReview({
        ...newReview,
        productId: id,
        username: "Anonymous", // 예시로, 실제로는 로그인된 사용자 정보 사용
      });
      setReviews([...reviews, { ...newReview, id: newReviewId }]);
      setNewReview({ comment: "", rating: 5 });
    } catch (err) {
      setError(err.message || "Failed to submit review");
    }
  };

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
      <div className="container mt-5">
        <h1>{product.name}</h1>
        <div className="row">
          <div className="col-md-6">
            <img src={product.image} alt={product.name} className="img-fluid" />
          </div>
          <div className="col-md-6">
            {product.inSoldout ? (
              <p>
                <span className="price-sold-out">${product.price}</span>
                <span className="sold-out-text ms-2">품절</span>
              </p>
            ) : (
              <p>가격: ${product.price}</p>
            )}
            <p>설명: {product.description}</p>
            <p>재고: {product.stock}</p>
            <p>상태: {product.inSoldout ? "Sold Out" : "Available"}</p>

            <form id="cart-form" action="#" method="post">
              <input type="hidden" name="productId" value={product.id} />
              <input
                type="number"
                name="quantity"
                min="1"
                max={product.stock}
                defaultValue="1"
                className="form-control mb-2"
              />
              <button
                type="submit"
                className="btn btn-primary"
                id={`add-to-cart-${product.id}`}
                disabled={product.inSoldout}
              >
                장바구니에 추가
              </button>
            </form>
          </div>
        </div>
        <a href="/products" className="btn btn-secondary mt-3">
          뒤로가기
        </a>
      </div>

      {/* 리뷰 작성 섹션 */}
      <div className="mt-4">
        <h2>리뷰 작성</h2>
        <form onSubmit={handleReviewSubmit}>
          <div className="form-group">
            <label htmlFor="username">이름</label>
            <input
              type="text"
              id="username"
              name="username"
              className="form-control"
              value={username} // 로그인된 사용자 이름 사용
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="comment">리뷰</label>
            <textarea
              id="comment"
              name="comment"
              className="form-control"
              rows="4"
              value={newReview.comment}
              onChange={(e) =>
                setNewReview({ ...newReview, comment: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="rating">평점</label>
            <select
              id="rating"
              name="rating"
              className="form-control"
              value={newReview.rating}
              onChange={(e) =>
                setNewReview({ ...newReview, rating: parseInt(e.target.value) })
              }
              required
            >
              <option value="5">★★★★★ (5점)</option>
              <option value="4">★★★★☆ (4점)</option>
              <option value="3">★★★☆☆ (3점)</option>
              <option value="2">★★☆☆☆ (2점)</option>
              <option value="1">★☆☆☆☆ (1점)</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            리뷰 제출
          </button>
        </form>
      </div>

      {/* 리뷰 리스트 섹션 */}
      <div className="mt-4">
        <h2>리뷰</h2>
        {reviews.length === 0 ? (
          <p>No reviews yet. Be the first to review this product!</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="border p-3 mb-3">
              <h4>{review.username}</h4>
              <p>{review.comment}</p>
              <p>
                평점:
                {[...Array(5)].map((_, index) =>
                  index < review.rating ? "★" : "☆"
                )}
              </p>
              <p>작성일: {new Date(review.createdDate).toLocaleDateString()}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
