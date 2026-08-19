import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQs from "./pages/FAQs";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import VerifyOTP from "./pages/VerifyOTP";
import Shop from "./pages/Shop";
import Profile from "./pages/Profile";
import AdminDashboard from "./admin/AdminDashboard";
import AdminProduct from "./admin/AdminProduct";
import AdminOrders from "./admin/AdminOrders";
import AdminUsers from "./admin/AdminUsers";
import AdminSales from "./admin/AdminSales";

function App() {
  return (
    <Router>
       <Navbar />
      <Routes>
              <Route path = "/" element = {<Home/>} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faqs" element={<FAQs />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/products/:id" element={<ProductDetail/>}/>
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/verify-otp" element={<VerifyOTP />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />}/>
              <Route path= "/admin/product" element={<AdminProduct/>}/>
              <Route path="/admin/orders" element={<AdminOrders />} />
              <Route path="/admin/users" element={<AdminUsers />}/>
              <Route path="/admin/sales" element={<AdminSales />}/>


      </Routes>
       <Footer />
    </Router>
  );
}


export default App;
