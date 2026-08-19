const Order = require('../model/Order');


const sendEmail = require('../utils/sendEmail');

// Create a new order
const createOrder = async (req, res) => {
    try {
        const { products, totalAmount, address, paymentId } = req.body;

        const order = await Order.create({
            user: req.user._id,
            products,
            totalAmount,
            address,
            paymentId
        });
        await order.save();

        const message = `Dear ${req.user.name},\n\nYour order has been placed successfully. Your order ID is ${order._id}.\n\nThank you for shopping with us!`;

        await sendEmail(
            req.user.email,
            'Order Placed',
            message
        );

        res.status(201).json(order);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

//Get my orders for login user
const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).populate('products.product');
        res.json(orders);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

//Get order by ID
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('products.product');
        

        if (!order) {
            return res.status(404).json({
                message: 'Order not found'
            });
        }

        res.json(order);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Get all orders (admin only)
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({})
            .populate('user', 'name email')
            .populate('products.product', 'name price imageUrl');

        res.json(orders);

    } catch (error) {
        console.error('GET ALL ORDERS ERROR:', error);

        res.status(500).json({
            message: error.message
        });
    }
};


// Update order status (admin only)
const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findById(req.params.id);  
        order.status = status;
        await order.save();

        if(!order) {
            return res.status(404).json({
                message: 'Order not found'
            });
        }

        res.json(order);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


module.exports = {
    createOrder,
    getMyOrders,
    getOrderById,
    getAllOrders,
    updateOrderStatus
};