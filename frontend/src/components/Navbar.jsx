import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";
import "../styles/navbar.css";

const Navbar = () => {
const { user, logout } = useAuth();
const cartItems = useSelector((state) => state.cart.cartItems);
const navigate = useNavigate();

const handleLogout = () => {
  logout();
  navigate("/login");
};

  return (
    <nav className="navbar">

      <div className="navbar-brand">
  <Link to="/">
    <img
  src="/logo.png"
  alt="ShopNest"
  
/>

    <span>ShopNest</span>
  </Link>
</div>

      <ul className="navbar-links">

        <li>
          <Link to="/shop">Shop</Link>
        </li>

        <li>
          <Link to="/cart">
            Cart ({cartItems.length})
          </Link>
        </li>

        {user ? (
          <>
            <li>
              <Link to="/profile">
                Hi, {user.name}
              </Link>
            </li>

            {user.role === "admin" && (
              <li>
                <Link to="/admin/dashboard">
                  Admin
                </Link>
              </li>
            )}

            <li>
              <button
                onClick={handleLogout}
                className="btn-logout"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login">
              Login
            </Link>
          </li>
        )}

      </ul>

    </nav>
  );
};

export default Navbar;