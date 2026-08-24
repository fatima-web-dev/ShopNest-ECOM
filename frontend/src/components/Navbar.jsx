import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";
import "../styles/navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMenuOpen(false);
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


      {/* HAMBURGER BUTTON */}

      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>


      {/* NAVIGATION LINKS */}

      <ul className={`navbar-links ${menuOpen ? "active" : ""}`}>

        <li>
          <Link
            to="/shop"
            onClick={() => setMenuOpen(false)}
          >
            Shop
          </Link>
        </li>


        <li>
          <Link
            to="/cart"
            onClick={() => setMenuOpen(false)}
          >
            Cart ({cartItems.length})
          </Link>
        </li>


        {user ? (
          <>

            <li>
              <Link
                to="/profile"
                onClick={() => setMenuOpen(false)}
              >
                Hi, {user.name}
              </Link>
            </li>


            {user.role === "admin" && (
              <li>
                <Link
                  to="/admin/dashboard"
                  onClick={() => setMenuOpen(false)}
                >
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
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
          </li>

        )}

      </ul>

    </nav>
  );
};

export default Navbar;