import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetail.css';

const images = require.context('../assets', false, /\.(png|jpe?g|svg)$/);

const ProductDetail = ({ allProducts, addToCart }) => {
    const [quantity, setQuantity] = useState(1);
    const { productId } = useParams();

    // Ghi log productId và allProducts
    console.log('Product ID from URL:', productId);
    console.log('All Products:', allProducts);

    const product = allProducts?.find(p => p.product_id === productId);

    // Ghi log sản phẩm tìm được
    console.log('Found Product:', product);

    if (!product) {
    return <p>Sản phẩm không tồn tại hoặc không tìm thấy.</p>;
    }

    const handleBuyNow = () => {
    // Logic xử lý mua
    };

    return (
        <div className="product-detail">
            <div className="product-content">
                <img src={images(`./${product.imageUrl}`)} alt={product.product_name} className="product-image" />
                <div className="product-info">
                    <h2>{product.product_name}</h2>
                    <p>Chi tiết sản phẩm : {product.description}</p>
                    <p>Giá: {product.cost} VND</p>
                    <div className="quantity">
                        <button onClick={() => setQuantity(quantity - 1)} disabled={quantity === 1}>-</button>
                        <span className="quantity-display">{quantity}</span>
                        <button onClick={() => setQuantity(quantity + 1)}>+</button>
                    </div>
                    <div className="button-group">
                        <button onClick={() => addToCart(product)}>Thêm vào giỏ hàng</button>
                        <button onClick={handleBuyNow} className="buy-now-button">Mua ngay</button>
                    </div>
                </div>
            </div>
        </div>
    );
    
};
export default ProductDetail;
