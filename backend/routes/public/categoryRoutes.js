const express = require('express');
const router = express.Router();
const db = require('../../db'); 
const util = require('util'); 

const queryAsync = util.promisify(db.query).bind(db);

// API lấy danh sách loại sản phẩm
router.get('/categories', async (req, res) => {
    try {
        const [categories] = await db.execute('SELECT * FROM categories');
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy danh sách loại sản phẩm', error });
    }
});

module.exports = router;
