import React from "react";
import { Link } from "react-router-dom";
import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer">

      {/* Main Footer */}
      <div className="footer-container">

        {/* About ShopNest */}
        <div className="footer-section footer-about">
          <h2>ShopNest</h2>

          <p>
            Your one-stop online shopping destination. 
            Discover quality products at affordable prices.
          </p>

          <div className="footer-social">
            <a href="#facebook">Facebook</a>
            <a href="#instagram">Instagram</a>
            <a href="#twitter">Twitter</a>
          </div>
        </div>


        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>

          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/profile">My Profile</Link>
        </div>


        {/* Customer Service */}
        <div className="footer-section">
          <h3>Customer Service</h3>

          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact Us</Link>
          <Link to="/faqs">FAQs</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms & Conditions</Link>
        </div>


        {/* Contact */}
        <div className="footer-section footer-contact">
          <h3>Contact Us</h3>

          <p>📧 support@shopnest.com</p>
          <p>📞 +92 300 1234567</p>
          <p>📍 Pakistan</p>

        </div>

      </div>


      {/* Newsletter */}
      <div className="footer-newsletter">

        <div>
          <h3>Stay Updated</h3>
          <p>
            Subscribe to get updates about new products and offers.
          </p>
        </div>

        <div className="newsletter-form">
          <input
            type="email"
            placeholder="Enter your email"
          />

          <button>
            Subscribe
          </button>
        </div>

      </div>


      {/* Copyright */}
      <div className="footer-bottom">

        <p>
          © 2026 ShopNest. All rights reserved.
        </p>

        <p>
          Designed & Developed with ❤️ for ShopNest
        </p>

      </div>

    </footer>
  );
};

export default Footer;