import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Home/Header';

const ProductDetail = () => {
    const { id } = useParams();  // URL에서 id 파라미터를 가져옴
    const [product, setProduct] = useState(null); // 상품 정보를 저장할 state
    const [error, setError] = useState(null); // 에러 정보를 저장할 state

    useEffect(() => {
        // 상품 정보를 가져오기 위한 비동기 함수
        const fetchProduct = async () => {
            try {
                const response = await fetch(`/api/products/${id}`); // API 요청
                if (!response.ok) {
                    throw new Error('Product not found');
                }
                const data = await response.json(); // 응답 데이터를 JSON으로 변환
                setProduct(data); // 상품 정보 state 업데이트
            } catch (error) {
                setError(error.message); // 에러 메시지 state 업데이트
            }
        };

        fetchProduct(); // 컴포넌트 마운트 시 상품 정보 가져오기 실행
    }, [id]); // id가 변경될 때마다 useEffect 실행

    if (error) {
        return <div>404 - Product not found</div>; // 상품이 없는 경우 에러 메시지 표시
    }

    if (!product) {
        return <div>Loading...</div>; // 상품 정보를 불러오는 동안 로딩 표시
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
              <p> {Intl.NumberFormat().format(product.price)} 원</p>
            )}
            <p>설명: {product.description}</p>
            {/* <p>재고: {product.stock}</p>
            <p>상태: {product.inSoldout ? "Sold Out" : "Available"}</p> */}

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

      {/* 리뷰 작성 섹션
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
      </div> */}

      {/* 리뷰 리스트 섹션
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
      </div> */}
    </div>
  );
};

export default ProductDetail;
