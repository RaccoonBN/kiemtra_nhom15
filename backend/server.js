const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); 
const categoriesRoutes = require('./routes/admin/categories');
const brandsRoutes = require('./routes/admin/brands');
const productsRoutes = require('./routes/admin/products');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/admin/categories', categoriesRoutes);
app.use('/api/admin/brands', brandsRoutes);
app.use('/api/admin/products', productsRoutes);
app.use(express.static(path.join(__dirname, 'uploads')));

app.listen(PORT, () => {
    console.log(`Server đang chạy trên cổng ${PORT}`);
});