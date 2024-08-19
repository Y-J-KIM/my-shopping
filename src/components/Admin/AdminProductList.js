import React, { useEffect, useState } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductModal from './ProductModal';  // 상품 등록 모달
import ModifyModal from './ModifyModal';    // 상품 수정 모달
import axios from 'axios';

const AdminProductList = () => {
  const [products, setProducts] = useState([]); // 초기 상태를 빈 배열로 설정
  const [showProductModal, setShowProductModal] = useState(false);
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
        try {
            const response = await axios.get('/api/admin/product');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    fetchProducts();
}, []);

  const handleOpenModifyModal = (product) => {
    setSelectedProduct(product);
    setShowModifyModal(true);
  };

  const handleCloseModifyModal = () => {
    setShowModifyModal(false);
    setSelectedProduct(null);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      fetch(`/admin/product/delete/${id}`, {
        method: 'DELETE'
      })
        .then(response => {
          if (response.ok) {
            alert('상품이 삭제되었습니다.');
            setProducts(products.filter(product => product.id !== id));
          } else {
            alert('삭제 실패!');
          }
        })
        .catch(error => console.error('Error:', error));
    }
  };

  return (
    <div>
      <h2>관리자 상품관리 페이지</h2>
      <Button variant="primary" onClick={() => setShowProductModal(true)}>상품 등록</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>이미지</th>
            <th>상품명</th>
            <th>설명</th>
            <th>가격</th>
            <th>재고</th>
            <th>상태</th>
            <th>액션</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center">상품이 없습니다.</td>
            </tr>
          ) : (
            products.map(product => (
              <tr key={product.id}>
                <td><img src={product.image} alt="상품 이미지" style={{ width: '100px' }} /></td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{new Intl.NumberFormat().format(product.price)}</td>
                <td>{product.stock}</td>
                <td>{product.inSoldout ? '품절' : '판매중'}</td>
                <td>
                  <Button variant="warning" onClick={() => handleOpenModifyModal(product)}>수정</Button>
                  <Button variant="danger" onClick={() => handleDeleteProduct(product.id)}>삭제</Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {/* 상품 등록 모달 */}
      <ProductModal show={showProductModal} onHide={() => setShowProductModal(false)} 
        onProductAdded={(newProduct) => {
          setProducts([...products, newProduct]);
          setShowProductModal(false);
        }} 
      />

      {/* 상품 수정 모달 */}
      {selectedProduct && (
        <ModifyModal
          show={showModifyModal}
          onHide={handleCloseModifyModal}
          product={selectedProduct}
          onProductModified={(modifiedProduct) => {
            setProducts(products.map(product => 
              product.id === modifiedProduct.id ? modifiedProduct : product
            ));
            handleCloseModifyModal();
          }}
        />
      )}
    </div>
  );
};

export default AdminProductList;
