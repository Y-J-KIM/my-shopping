import React, { useState, useEffect } from 'react';

const ModifyModal = ({ show, handleClose, product, setProducts }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [inSoldout, setInSoldout] = useState(false);
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('');

    useEffect(() => {
        if (product) {
            setName(product.name || '');
            setDescription(product.description || '');
            setPrice(product.price || '');
            setStock(product.stock || '');
            setInSoldout(product.inSoldout || false);
            setImagePreview(product.image || '');
        }
    }, [product]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('stock', stock);
        formData.append('inSoldout', inSoldout);
        if (image) formData.append('image', image);

        fetch(`/api/admin/product/modify/${product.id}`, {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                setProducts(products => products.map(p => (p.id === product.id ? data : p)));
                handleClose();
                alert('상품 수정 성공');
            })
            .catch(error => {
                console.error('Error:', error);
                alert('상품 수정 실패');
            });
    };

    if (!show) return null;

    return (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">상품 수정</h5>
                        <button type="button" className="close" onClick={handleClose}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">상품명:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">설명:</label>
                                <textarea
                                    className="form-control"
                                    id="description"
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="price" className="form-label">가격:</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="price"
                                    value={price}
                                    onChange={e => setPrice(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="stock" className="form-label">재고:</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="stock"
                                    value={stock}
                                    onChange={e => setStock(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="inSoldout" className="form-label">판매중/품절:</label>
                                <select
                                    className="form-select"
                                    id="inSoldout"
                                    value={inSoldout}
                                    onChange={e => setInSoldout(e.target.value === 'true')}
                                >
                                    <option value="false">판매중</option>
                                    <option value="true">품절</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="image" className="form-label">상품 이미지 업로드:</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="image"
                                    onChange={handleImageChange}
                                />
                                {imagePreview && <img src={imagePreview} alt="미리보기" style={{ width: '100px', marginTop: '10px' }} />}
                            </div>
                            <button type="submit" className="btn btn-primary">저장</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModifyModal;
