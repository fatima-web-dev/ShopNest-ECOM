const razorpay = require('razorpay');
const crypto = require('crypto');
const Order = require('../model/Order');
const dotenv = require('dotenv');
dotenv.config();

const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

//create razorpay order
const createdOrder = async (req, res) => {
    try {
    const { amount, currency, receipt } = req.body;

    console.log("BODY:", req.body);

    const order = await razorpayInstance.orders.create({
        amount: amount * 100, // Razorpay expects amount in paise
        currency: currency,
        receipt: receipt
    });

     console.log("RAZORPAY ORDER:", order);

    res.json(order);
    } catch (error) 
    {
         console.error("RAZORPAY ERROR:", error);

        res.status(500).json({
            message: error.message
        });
    }
};


//verify payment

const verifyPayment = async (req, res) => {
    try {
        const { orderId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const generated_signature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest('hex'); 

            if (generated_signature === razorpay_signature) {

                const order = await Order.findOne({ _id: req.body.orderId });

                if (!order) {
                    return res.status(404).json({ message: 'Order not found' });
                }

                order.paymentId = razorpay_payment_id;
                order.status = 'processing'; // Update the order status to 'Processing' after successful payment
                await order.save();

                res.json({ message: 'Payment verified successfully' });
            }
            else {
                res.status(400).json({ message: 'Invalid signature' });
            }
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = { createdOrder, verifyPayment };