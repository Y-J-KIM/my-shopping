// productServices.js

const API_BASE_URL = '/api';

export const fetchProducts = async () => {
  const response = await fetch(`${API_BASE_URL}/products`);
  return response;
};

export const fetchProductById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/product/${id}`);
  return response;
};

export const createProduct = async (productData) => {
  const response = await fetch(`${API_BASE_URL}/admin/product/new/pro`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
  });
  return response;
};

export const updateProduct = async (id, productData) => {
  const response = await fetch(`${API_BASE_URL}/admin/product/modify/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
  });
  return response;
};

export const deleteProduct = async (id) => {
  const response = await fetch(`${API_BASE_URL}/admin/product/delete/${id}`, {
    method: 'DELETE',
  });
  return response;
};

export const addReview = async (reviewData) => {
  const response = await fetch(`${API_BASE_URL}/product/addReview`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reviewData),
  });
  return response;
};

export const fetchProductDetail = async (id) => {
  const response = await fetch(`${API_BASE_URL}/product/detail/${id}`);
  return response;
};

export const fetchAdminProducts = async () => {
  const response = await fetch(`${API_BASE_URL}/admin/product`);
  return response;
};
