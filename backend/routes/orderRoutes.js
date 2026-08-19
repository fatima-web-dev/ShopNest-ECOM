const express = require('express');
const { Protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');
const { createOrder, getMyOrders, getOrderById, getAllOrders, updateOrderStatus } = require('../controllers/orderController');

const router = express.Router();

router.route('/')
    .post(Protect, createOrder)
    .get(Protect, admin, getAllOrders);

router.route('/my-orders')
    .get(Protect, getMyOrders);

router.route('/:id')
    .get(Protect, getOrderById);

router.route('/:id/status')
    .put(Protect, admin, updateOrderStatus);

module.exports = router;