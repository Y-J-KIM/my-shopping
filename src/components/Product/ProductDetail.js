import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../Home/Header";
import Footer from "../Home/Footer";
import { useUser } from "../UserContext"; // UserContext에서 훅을 가져옴
import CartService from "../services/CartService";

const ProductDetail = () => {
  const { id } = useParams(); // URL에서 id 파라미터를 가져옴
  const [product, setProduct] = useState(null); // 상품 정보를 저장할 state
  const [quantity, setQuantity] = useState(1); // 수량을 저장할 state
  const [error, setError] = useState(null); // 에러 정보를 저장할 state
  const navigate = useNavigate(); // 페이지 이동을 위한 훅
  const { user } = useUser(); // 로그인된 사용자 정보 가져오기
  //console.log(user);
  useEffect(() => {
    // 상품 정보를 가져오기 위한 비동기 함수
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${id}`);
        setProduct(response.data); // 상품 정보 state 업데이트
      } catch (error) {
        setError("Product not found");
      }
    };

    fetchProduct(); // 컴포넌트 마운트 시 상품 정보 가져오기 실행
  }, [id]);

  const handleAddToCart = async () => {
    try {
      console.log(user.id, product.id, quantity);
      //옵션으로 credentials: 'include'를 추가하여 쿠키를 포함시킵니다.
      await CartService.addItemToCart(user.id, product.id, quantity, {
        credentials: "include", // 이 부분이 중요
      });
      alert("Item added to cart!");
    } catch (error) {
      alert("Failed to add item to cart");
      console.error(error);
    }
  };

  if (error) {
    return <div>{error}</div>; // 에러 메시지 표시
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
              <p>{Intl.NumberFormat().format(product.price)} 원</p>
            )}
            <p>설명: {product.description}</p>

            <form id="cart-form" onSubmit={(e) => e.preventDefault()}>
              <input type="hidden" name="productId" value={product.id} />
              <input
                type="number"
                name="quantity"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="form-control mb-2"
              />
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleAddToCart}
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
      <Footer />
    </div>
  );
};

export default ProductDetail;
