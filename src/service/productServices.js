// src/services/productService.js

const API_BASE_URL = "/api";

// 유저의 제품 리스트 가져오기
export const fetchProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error;
  }
};

// 특정 제품 조회
export const fetchProductById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/product/${id}`);
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch product by id:", error);
    throw error;
  }
};

// 제품 상세페이지 리뷰 가져오기
export const fetchProductDetail = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/product/detail?id=${id}`);
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch product detail:", error);
    throw error;
  }
};

// 리뷰 작성
export const addReview = async (productId, comment, rating) => {
  try {
    const response = await fetch(`${API_BASE_URL}/product/addReview`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        productId,
        comment,
        rating,
      }),
    });
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("Failed to add review:", error);
    throw error;
  }
};

// 관리자의 제품 리스트 가져오기
export const fetchAdminProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/product`);
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch admin products:", error);
    throw error;
  }
};

// 상품 등록
export const createProduct = async (productData) => {
  try {
    const formData = new FormData();
    Object.keys(productData).forEach((key) =>
      formData.append(key, productData[key])
    );

    const response = await fetch(`${API_BASE_URL}/admin/product/new/pro`, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("Failed to create product:", error);
    throw error;
  }
};

// 상품 수정
export const updateProduct = async (id, productData) => {
  try {
    const formData = new FormData();
    Object.keys(productData).forEach((key) =>
      formData.append(key, productData[key])
    );

    const response = await fetch(`${API_BASE_URL}/admin/product/modify/${id}`, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("Failed to update product:", error);
    throw error;
  }
};

// 상품 삭제
export const deleteProduct = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/product/delete/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.text();
  } catch (error) {
    console.error("Failed to delete product:", error);
    throw error;
  }
};
