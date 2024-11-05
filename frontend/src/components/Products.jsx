import React, { useState } from 'react'; 
import './products.css';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

/*import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';*/

const images = require.context('../assets', false, /\.(png|jpe?g|svg)$/);

const Products = ({ allProducts = [], filteredProducts = [], addToCart }) => { 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
 /* const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');*/

  const displayProducts = filteredProducts.length > 0 ? filteredProducts : allProducts;

  // Tính toán phân trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = displayProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(displayProducts.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  /*const openPopup = (product) => {
    setSelectedProduct(product);
    setSelectedSize('');
  };

  const closePopup = () => {
    setSelectedProduct(null);
  };

  const handleBuyNow = () => {
    if (selectedProduct && selectedSize) {
      console.log(`Mua ngay ${selectedProduct.product_name} với kích thước ${selectedSize}.`);
      closePopup();
    } else {
      alert('Vui lòng chọn kích thước trước khi mua.');
    }
  };*/

  return (
    <div className="content">
      <div className="products-grid">
        {currentItems.length > 0 ? (
          currentItems.map(product => (
            <div key={product.product_id} className="product-card">
              <Link to={`/products/${product.product_id}`}>
                <img src={images(`./${product.imageUrl}`)} alt={product.product_name} />                 
                <h3>{product.product_name}</h3>
                <p>{product.cost} VND</p>
              </Link>
            </div>
          ))
        ) : (
          <p>Không có sản phẩm nào.</p>
        )}
      </div>

      <div className="pagination">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
            disabled={totalPages === 1}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Products;
