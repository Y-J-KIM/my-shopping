// productServices.js

import apiClient from "../utils/api-client";

// 제품 목록을 가져오는 함수
export const fetchProducts = async () => {
  try {
    const response = await apiClient.get("/products");
    return response.data; // JSON 데이터를 반환합니다.
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error; // 에러를 상위로 전파
  }
};

// 제품 세부 정보를 가져오는 함수
export const fetchProductById = async (id) => {
  try {
    const response = await apiClient.get(`/product/${id}`);
    return response.data; // JSON 데이터를 반환합니다.
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    throw error; // 에러를 상위로 전파
  }
};

// 제품을 추가하는 함수
export const createProduct = async (productData) => {
  try {
    const response = await apiClient.post(
      "/admin/product/new/pro",
      productData
    );
    return response.data; // JSON 데이터를 반환합니다.
  } catch (error) {
    console.error("Error creating product:", error);
    throw error; // 에러를 상위로 전파
  }
};

// 제품을 업데이트하는 함수
export const updateProduct = async (id, productData) => {
  try {
    const response = await apiClient.post(
      `/admin/product/modify/${id}`,
      productData
    );
    return response.data; // JSON 데이터를 반환합니다.
  } catch (error) {
    console.error(`Error updating product with id ${id}:`, error);
    throw error; // 에러를 상위로 전파
  }
};

// 제품을 삭제하는 함수
export const deleteProduct = async (id) => {
  try {
    const response = await apiClient.delete(`/admin/product/delete/${id}`);
    return response.data; // JSON 데이터를 반환합니다.
  } catch (error) {
    console.error(`Error deleting product with id ${id}:`, error);
    throw error; // 에러를 상위로 전파
  }
};

// 리뷰를 추가하는 함수
export const addReview = async (reviewData) => {
  try {
    const response = await apiClient.post("/product/addReview", reviewData);
    return response.data; // JSON 데이터를 반환합니다.
  } catch (error) {
    console.error("Error adding review:", error);
    throw error; // 에러를 상위로 전파
  }
};

// 제품 세부 정보를 가져오는 함수
export const fetchProductDetail = async (id) => {
  try {
    const response = await apiClient.get(`/product/detail/${id}`);
    return response.data; // JSON 데이터를 반환합니다.
  } catch (error) {
    console.error(`Error fetching product detail with id ${id}:`, error);
    throw error; // 에러를 상위로 전파
  }
};

// 관리자의 모든 제품을 가져오는 함수
export const fetchAdminProducts = async () => {
  try {
    const response = await apiClient.get("/admin/product");
    return response.data; // JSON 데이터를 반환합니다.
  } catch (error) {
    console.error("Error fetching admin products:", error);
    throw error; // 에러를 상위로 전파
  }
};
