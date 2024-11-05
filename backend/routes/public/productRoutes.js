// routes/product_route.js
const express = require('express');
const router = express.Router();
const db = require('../../db'); 
const util = require('util'); 


const queryAsync = util.promisify(db.query).bind(db);

// API lấy dữ liệu products
router.get('/products', (req, res) => {
    const query = 'SELECT * FROM products'; 
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});


module.exports = router;
