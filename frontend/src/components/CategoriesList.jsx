import React, { useState, useEffect } from 'react';
import './CategoriesList.css';

const CategoriesList = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/products/categories')
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error('Lỗi khi lấy danh mục:', error));
    }, []);

    return (
        <div className="categories-list">
            <h2>Danh Mục Loại Sản Phẩm</h2>
            <ul>
                {categories.map(category => (
                    <li key={category.cate_id}>{category.cate_name}</li>
                ))}
            </ul>
        </div>
    );
};

export default CategoriesList;
