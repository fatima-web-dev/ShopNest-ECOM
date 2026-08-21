const express = require('express');
const { Protect } = require('../middleware/authMiddleware');
const  { admin  } = require('../middleware/adminMiddleware');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const { getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct } = require('../controllers/productController');

const router = express.Router();
 //all products

 router.route('/').get(getAllProducts).post(Protect, admin, upload.single('image'), createProduct);

 //specific product
 router.route('/:id').get(getProductById).put(Protect, admin, upload.single('image'), updateProduct).delete(Protect, admin, deleteProduct);

 module.exports = router;