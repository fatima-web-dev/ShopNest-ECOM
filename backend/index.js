const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

dotenv.config();

const app = express();

// ===============================
// CORS
// ===============================

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      process.env.FRONTEND_URL
    ],
    credentials: true,
  })
);

// ===============================
// BODY PARSER
// ===============================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===============================
// DATABASE
// ===============================

connectDB();

// ===============================
// API ROUTES
// ===============================

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/payments", require("./routes/paymentRoutes"));
app.use("/api/analytics", require("./routes/analyticsRoutes"));

// ===============================
// TEST ROUTE
// ===============================

app.get("/", (req, res) => {
  res.send("ShopNest API is running!");
});

// ===============================
// VERCEL
// ===============================

module.exports = app;

// ===============================
// LOCAL DEVELOPMENT
// ===============================

if (require.main === module) {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}