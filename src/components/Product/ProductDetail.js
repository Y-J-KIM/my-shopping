// src/components/Product/ProductDetail.js

import React, { useEffect, useState } from "react";
import { getProductById, addReview } from "../../services/productServices";

const ProductDetail = ({ match }) => {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const [review, setReview] = useState({ comment: "", rating: 5 });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProductById(match.params.id);
        setProduct(productData);
      } catch (err) {
        setError("Failed to load product details.");
      }
    };

    fetchProduct();
  }, [match.params.id]);

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReview((prevReview) => ({ ...prevReview, [name]: value }));
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      await addReview(product.id, review.comment, review.rating);
      setReview({ comment: "", rating: 5 });
    } catch (err) {
      setError("Failed to add review.");
    }
  };

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {product ? (
        <div>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>${product.price}</p>
          <h3>Reviews</h3>
          {/* Render reviews here */}
          <form onSubmit={handleSubmitReview}>
            <textarea
              name="comment"
              value={review.comment}
              onChange={handleReviewChange}
              placeholder="Write a review..."
            />
            <input
              type="number"
              name="rating"
              value={review.rating}
              onChange={handleReviewChange}
              min="1"
              max="5"
            />
            <button type="submit">Add Review</button>
          </form>
        </div>
      ) : (
        <p>Loading product details...</p>
      )}
    </div>
  );
};

export default ProductDetail;
