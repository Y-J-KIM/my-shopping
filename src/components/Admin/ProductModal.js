import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const ProductModal = ({ show, handleClose, onAddProduct }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [inSoldout, setInSoldout] = useState(false);
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('stock', stock);
        formData.append('inSoldout', inSoldout);
        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await axios.post('http://localhost:3000/api/admin/product/new/pro', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            // 새로운 제품 추가 후 작업
            console.log('Product added:', response.data);

            handleClose(); // 모달 닫기
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    </Form.Group>
                    <Form.Group controlId="formDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formPrice">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
                    </Form.Group>
                    <Form.Group controlId="formStock">
                        <Form.Label>Stock</Form.Label>
                        <Form.Control type="number" value={stock} onChange={(e) => setStock(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formInSoldout">
                        <Form.Check 
                            type="checkbox" 
                            label="Sold Out" 
                            checked={inSoldout} 
                            onChange={(e) => setInSoldout(e.target.checked)} 
                        />
                    </Form.Group>
                    <Form.Group controlId="formImage">
                        <Form.Label>Image</Form.Label>
                        <Form.Control type="file" onChange={(e) => setImage(e.target.files[0])} />
                    </Form.Group>
                    <Button variant="primary" type="submit">Add Product</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ProductModal;
