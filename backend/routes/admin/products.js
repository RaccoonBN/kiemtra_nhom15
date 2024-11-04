const express = require('express');
const db = require('../../db');
const router = express.Router();
const multer = require('multer');
const path = require('path'); // Thêm import cho path

// Cấu hình multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Nơi lưu trữ file tải lên
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});

const upload = multer({ storage });

// Lấy tất cả sản phẩm cùng với tên thương hiệu và tên danh mục
router.get('/', (req, res) => {
    const query = `
        SELECT p.*, b.brand_name, c.cate_name
        FROM products p
        LEFT JOIN brands b ON p.brand_id = b.brand_id
        LEFT JOIN categories c ON p.cate_id = c.cate_id
    `;

    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Thêm sản phẩm mới
router.post('/', upload.single('image'), (req, res) => {
    const { product_id, product_name, cost, quantity, description, brand_id, size_id, cate_id } = req.body;

    // Kiểm tra xem file tải lên có hợp lệ không
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null; // Nếu không có hình ảnh, để là null

    const sql = 'INSERT INTO products (product_id, product_name, cost, quantity, description, brand_id, size_id, cate_id, imageUrl) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

    db.query(sql, [product_id, product_name, cost, quantity, description, brand_id, size_id, cate_id, imageUrl], (err, result) => {
        if (err) {
            console.error('Error inserting product:', err); // Ghi lại lỗi
            return res.status(500).json({ error: 'Lỗi khi thêm sản phẩm.' });
        }
        res.status(201).json({
            id: result.insertId,
            product_id,
            product_name,
            cost,
            quantity,
            description,
            brand_id,
            size_id,
            cate_id,
            imageUrl
        });
    });
});

// Sửa sản phẩm
router.put('/:id', upload.single('image'), (req, res) => {
    const { id } = req.params;
    const { product_name, cost, quantity, description, brand_id, size_id, cate_id } = req.body;

    // Kiểm tra xem file tải lên có hợp lệ không
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null; // Nếu không có hình ảnh, để là null

    const sql = 'UPDATE products SET product_name = ?, cost = ?, quantity = ?, description = ?, brand_id = ?, size_id = ?, cate_id = ?, imageUrl = ? WHERE product_id = ?';
    
    db.query(sql, [product_name, cost, quantity, description, brand_id, size_id, cate_id, imageUrl, id], (err) => {
        if (err) {
            console.error('Error updating product:', err); // Ghi lại lỗi
            return res.status(500).json({ error: 'Lỗi khi sửa sản phẩm.' });
        }
        res.status(200).json({ message: 'Sản phẩm đã được cập nhật thành công.', data: updatedProduct });    });
});

// Xóa sản phẩm
router.delete('/:product_id', (req, res) => {
    const { product_id } = req.params;

    db.query('DELETE FROM products WHERE product_id = ?', [product_id], (err) => {
        if (err) {
            console.error('Error deleting product:', err); // Ghi lại lỗi
            return res.status(500).json({ error: 'Lỗi khi xóa sản phẩm.' });
        }
        res.json({ message: 'Sản phẩm đã được xóa thành công.' });
    });
});

module.exports = router;
