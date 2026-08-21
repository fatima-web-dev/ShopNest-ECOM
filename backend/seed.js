const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config();

const User = require('./model/User');
const Product = require('./model/Product');
const Order = require('./model/Order');


const seedDatabase = async () => {
    try {

        // Connect MongoDB
        await mongoose.connect(process.env.MONGO_URI);

        console.log('Connected to MongoDB');


        // Clear existing data
        await User.deleteMany({});
        await Product.deleteMany({});
        await Order.deleteMany({});

        console.log('Cleared existing data');


        // =========================
        // Seed Users
        // =========================

        const adminPassword = await bcrypt.hash('admin123', 10);
        const userPassword = await bcrypt.hash('user123', 10);

        const users = await User.insertMany([
            {
                name: 'Admin User',
                email: 'admin@shopnest.com',
                password: adminPassword,
                role: 'admin'
            },
            {
                name: 'John Doe',
                email: 'john@example.com',
                password: userPassword,
                role: 'user'
            },
            {
                name: 'Jane Smith',
                email: 'jane@example.com',
                password: userPassword,
                role: 'user'
            }
        ]);

        console.log('Users seeded');


        // =========================
        // Seed Products
        // =========================

        const products = await Product.insertMany([
    {
        name: 'Wireless Headphones',
        description: 'High-quality wireless headphones with noise cancellation',
        price: 79.99,
        category: 'Electronics',
        stock: 50,
        imageUrl: 'https://via.placeholder.com/300?text=Headphones'
    },

    {
        name: 'Cotton T-Shirt',
        description: 'Comfortable 100% cotton t-shirt',
        price: 19.99,
        category: 'Clothing',
        stock: 100,
        imageUrl: 'https://via.placeholder.com/300?text=T-Shirt'
    },

    {
        name: 'Coffee Maker',
        description: 'Automatic coffee maker with timer',
        price: 49.99,
        category: 'Home & Kitchen',
        stock: 30,
        imageUrl: 'https://via.placeholder.com/300?text=CoffeeMaker'
    },

    {
        name: 'JavaScript Guide',
        description: 'Complete guide to modern JavaScript',
        price: 29.99,
        category: 'Books',
        stock: 75,
        imageUrl: 'https://via.placeholder.com/300?text=JSGuide'
    }
]);

console.log('Products seeded');

        // =========================
        // Seed Orders
        // =========================

        await Order.insertMany([

            {
                user: users[1]._id,

                products: [
                    {
                        product: products[0]._id,
                        quantity: 1,
                        price: 79.99
                    }
                ],

                totalAmount: 79.99,

                status: 'delivered',

                address: {
                    fullName: 'John Doe',
                    street: '123 Main St',
                    city: 'New York',
                    postalCode: '10001',
                    country: 'USA'
                },

                paymentId: 'dummy_payment_001'
            },


            {
                user: users[2]._id,

                products: [
                    {
                        product: products[1]._id,
                        quantity: 2,
                        price: 19.99
                    }
                ],

                totalAmount: 39.98,

                status: 'pending',

                address: {
                    fullName: 'Jane Smith',
                    street: '456 Oak Ave',
                    city: 'Los Angeles',
                    postalCode: '90001',
                    country: 'USA'
                },

                paymentId: 'dummy_payment_002'
            },


            {
                user: users[1]._id,

                products: [
                    {
                        product: products[2]._id,
                        quantity: 1,
                        price: 49.99
                    },
                    {
                        product: products[3]._id,
                        quantity: 1,
                        price: 29.99
                    }
                ],

                totalAmount: 79.98,

                status: 'shipped',

                address: {
                    fullName: 'John Doe',
                    street: '123 Main St',
                    city: 'New York',
                    postalCode: '10001',
                    country: 'USA'
                },

                paymentId: 'dummy_payment_003'
            }

        ]);

        console.log('Orders seeded');

        console.log('Database seeding completed successfully!');

        process.exit(0);

    } catch (error) {

        console.error('Error seeding database:', error);

        process.exit(1);
    }
};


seedDatabase();