import React, { useEffect, useState } from "react";
import apiClient from "./apiClient"; // 위에서 설정한 axios 인스턴스

const ProductDetail = ({ match }) => {
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await apiClient.get(`/products/${match.params.id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product data", error);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await apiClient.get(
          `/products/${match.params.id}/reviews`
        );
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews", error);
      }
    };

    fetchProduct();
    fetchReviews();
  }, [match.params.id]);

  const handleReviewSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await apiClient.post(
        `/products/${match.params.id}/reviews`,
        {
          comment,
          rating,
        }
      );
      setReviews([...reviews, response.data]);
      setComment("");
      setRating(5);
    } catch (error) {
      console.error("Error submitting review", error);
    }
  };

  return (
    <div>
      {product && (
        <>
          <h1>{product.name}</h1>
          <img src={product.image} alt={product.name} />
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
        </>
      )}

      <h2>Reviews</h2>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <strong>{review.username}</strong> - {review.rating} ★
            <p>{review.comment}</p>
            <p>Posted on {new Date(review.createdDate).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>

      <h3>Write a Review</h3>
      <form onSubmit={handleReviewSubmit}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your review here..."
          required
        />
        <div>
          <label>
            <input
              type="radio"
              name="rating"
              value="5"
              checked={rating === 5}
              onChange={(e) => setRating(Number(e.target.value))}
            />{" "}
            5 ★
          </label>
          <label>
            <input
              type="radio"
              name="rating"
              value="4"
              checked={rating === 4}
              onChange={(e) => setRating(Number(e.target.value))}
            />{" "}
            4 ★
          </label>
          <label>
            <input
              type="radio"
              name="rating"
              value="3"
              checked={rating === 3}
              onChange={(e) => setRating(Number(e.target.value))}
            />{" "}
            3 ★
          </label>
          <label>
            <input
              type="radio"
              name="rating"
              value="2"
              checked={rating === 2}
              onChange={(e) => setRating(Number(e.target.value))}
            />{" "}
            2 ★
          </label>
          <label>
            <input
              type="radio"
              name="rating"
              value="1"
              checked={rating === 1}
              onChange={(e) => setRating(Number(e.target.value))}
            />{" "}
            1 ★
          </label>
        </div>
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default ProductDetail;
