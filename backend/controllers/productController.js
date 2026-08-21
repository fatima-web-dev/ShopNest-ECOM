
const Product = require('../model/Product');
const cloudinary = require('../config/cloudinary');


// ===============================
// Cloudinary Buffer Upload Helper
// ===============================

const uploadToCloudinary = (buffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: 'shopnest/products' },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );

        stream.end(buffer);
    });
};


// ===============================
// Get all products
// ===============================

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    }
    catch (error) {
        res.status(500).json({
            message: 'Server error'
        });
    }
};


// ===============================
// Get product by ID
// ===============================

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            res.json(product);
        }
        else {
            res.status(404).json({
                message: 'Product not found'
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: 'Server error'
        });
    }
};


// ===============================
// Create product
// ===============================

const createProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            category,
            stock
        } = req.body;

        let imageUrl = '';

        if (req.file) {
            const result = await uploadToCloudinary(req.file.buffer);
            imageUrl = result.secure_url;
        }

        const product = new Product({
            name,
            description,
            price,
            category,
            stock,
            imageUrl
        });

        await product.save();

        res.status(201).json(product);
    }
    catch (error) {
        console.error('CREATE PRODUCT ERROR:', error);

        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};


// ===============================
// Update product
// ===============================

const updateProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            category,
            stock
        } = req.body;

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.category = category || product.category;
        product.stock = stock || product.stock;

        if (req.file) {
            const result = await uploadToCloudinary(req.file.buffer);
            product.imageUrl = result.secure_url;
        }

        await product.save();

        res.json(product);
    }
    catch (error) {
        console.error('UPDATE PRODUCT ERROR:', error);

        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};


// ===============================
// Delete product
// ===============================

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        await Product.findByIdAndDelete(req.params.id);

        res.json({
            message: 'Product removed'
        });
    }
    catch (error) {
        console.error('DELETE PRODUCT ERROR:', error);

        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};


module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};

