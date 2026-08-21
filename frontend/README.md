ShopNest -- MERN E-Commerce Website

Project Overview

ShopNest is a full-stack e-commerce web application developed using
the MERN Stack.

Users can register, log in, browse products, view product details, add
products to a shopping cart, and manage their account. The project also
includes backend APIs, MongoDB integration, authentication, Redux
Toolkit, and an admin-oriented structure.

Technologies Used

Frontend

React.js

React Router DOM

Redux Toolkit

JavaScript

HTML5

CSS3

LocalStorage

Backend

Node.js

Express.js

MongoDB

Mongoose

JWT Authentication

bcryptjs

Nodemailer

Multer

Cloudinary

Development Tools

Visual Studio Code

MongoDB Atlas

MongoDB Compass

Postman

Git & GitHub

Main Features

User Authentication

User registration

User login and logout

JWT-based authentication

Password hashing using bcrypt

User profile

Role-based access

Products

View all products

Featured products

Product details

Product image, category, price and description

Product management structure

Shopping Cart

Add product to cart

Remove product

Increase product quantity

Cart item count

Clear cart

Redux Toolkit for global cart state

LocalStorage persistence

Other Features

Admin role and protected routes

Email functionality using Nodemailer

Product image handling using Cloudinary

API testing using Postman

Dark responsive UI with animated product cards

Project Structure

ShopNest-ECOM/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── index.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── admin/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── index.js
│   └── package.json
│
├── package.json
└── README.md

Requirements

Install the following before running the project:

Node.js and npm

MongoDB Atlas or MongoDB

Git

Postman (optional)

Installation

Clone the repository:

git clone YOUR_GITHUB_REPOSITORY_URL

Move into the project:

cd ShopNest-ECOM

Install all dependencies:

npm run install-all

If needed, install manually:

cd backend
npm install

cd ../frontend
npm install

Environment Variables

Create a .env file inside the backend folder.

Example:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

EMAIL_USER=your_email
EMAIL_PASS=your_email_password

RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret

Never upload the real .env file to GitHub.

Create a .env.example file instead:

PORT=5000
MONGO_URI=
JWT_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
EMAIL_USER=
EMAIL_PASS=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=

Running the Project

From the root directory:

npm run dev

The backend normally runs on:

http://localhost:5000

The React frontend normally runs on:

http://localhost:3000

NPM Scripts

npm run install-all
npm run dev
npm run start:backend
npm run start:frontend
npm run build
npm start
npm run seed

Main API Endpoints

Authentication

POST /api/auth/register
POST /api/auth/login

Products

GET    /api/products
GET    /api/products/:id
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id

The exact endpoints depend on the current backend route configuration.

Redux Cart Management

Redux Toolkit manages the cart globally.

Main actions:

addToCart
removeFromCart
clearCart

Cart items are also saved in LocalStorage so the cart can remain
available after refreshing the page.

Authentication Flow

Register
   ↓
Backend validates user
   ↓
Password is hashed
   ↓
User saved in MongoDB
   ↓
Login
   ↓
JWT token generated
   ↓
User information stored on frontend
   ↓
Protected routes can be accessed

API Testing with Postman

Register

POST http://localhost:5000/api/auth/register

Example body:

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "123456"
}

Login

POST http://localhost:5000/api/auth/login

Example body:

{
  "email": "test@example.com",
  "password": "123456"
}

Get Products

GET http://localhost:5000/api/products

Frontend Pages

Home

Shop

Product Details

Login

Register

Profile

Cart

About

Contact

FAQs

Privacy Policy

Terms & Conditions

Admin

Application Flow

Home
 ↓
Browse Products
 ↓
View Product Details
 ↓
Add Product to Cart
 ↓
Redux updates Cart
 ↓
Cart saved in LocalStorage
 ↓
Login / Register
 ↓
Authenticated User
 ↓
Profile / Admin / Other Features

Security

The project uses:

bcryptjs for password hashing

JWT authentication

Protected routes

Role-based authorization

Environment variables for secrets

CORS configuration

Backend validation

Deployment

Possible deployment services:

Frontend: Vercel

Backend: Render or Railway

Database: MongoDB Atlas

Images: Cloudinary

Update environment variables according to the deployment platform before
deploying.

Troubleshooting

Backend does not start

cd backend
npm install
npm run dev

Frontend does not start

cd frontend
npm install
npm start

MongoDB connection error

Check:

MongoDB URI

MongoDB Atlas Network Access

Database username

Database password

.env file

Postman connection refused

Make sure the backend is running on port 5000 and use:

http://localhost:5000

React white screen

Check the browser console and terminal for:

Import errors

Route errors

Context errors

Redux errors

Syntax errors

Author

ShopNest -- MERN E-Commerce Project

Developed as a learning and real-world MERN stack project.

License

This project is created for educational and development purposes.

© 2026 ShopNest. All rights reserved.