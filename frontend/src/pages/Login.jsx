import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API_URL from "../api";
import "../styles/auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();
      
            if (res.ok) {
            login(data);

            if (data.role === "admin") {
                navigate("/admin/dashboard");
            } else {
                navigate("/");
            }

      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-logo">
          ShopNest
        </div>

        <h1>Welcome Back</h1>

        <p className="auth-subtitle">
          Login to your ShopNest account
        </p>

        <form onSubmit={handleSubmit}>

          {/* Email */}
          <div className="auth-input-group">

            <label>Email Address</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

          </div>


          {/* Password */}
          <div className="auth-input-group">

            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

          </div>


          {/* Login Button */}
          <button
            type="submit"
            className="auth-btn"
          >
            Login
          </button>

        </form>


        {/* Register Link */}
        <p className="auth-switch">

          Don't have an account?

          <Link to="/register">
            Create Account
          </Link>

        </p>

      </div>

    </div>
  );
};

export default Login;