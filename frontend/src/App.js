import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/HomePage'; 

import Products from './components/Products';
import ProductDetail from './components/ProductDetail';

function App() {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); 
  const [isPopupOpen, setIsPopupOpen] = useState(false); 
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        const data = await response.json();
        setAllProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };
    
    fetchProducts();
  }, []);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home allProducts={allProducts} filteredProducts={filteredProducts}  />} /> 
          <Route path="/products" element={<Products allProducts={allProducts} filteredProducts={filteredProducts}  />} />
          <Route path="/products/:productId" element={<ProductDetail allProducts={allProducts} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
