import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API_URL from "../api";

import "../styles/auth.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/api/auth/register`,  {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await res.json();

        if (res.ok) {
            alert(data.message);
            navigate("/verify-otp", {
                state: { email }
            });
        } else {
            alert(data.message);
        }

    } catch (error) {
      console.error("Registration Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-logo">
          ShopNest
        </div>

        <h1>Create Account</h1>

        <p className="auth-subtitle">
          Join ShopNest and start shopping
        </p>

        <form onSubmit={handleSubmit}>

          {/* Name */}
          <div className="auth-input-group">

            <label>Full Name</label>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

          </div>


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
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

          </div>


          {/* Submit */}
          <button
            type="submit"
            className="auth-btn"
          >
            Create Account
          </button>

        </form>


        {/* Login Link */}
        <p className="auth-switch">

          Already have an account?

          <Link to="/login">
            Login
          </Link>

        </p>

      </div>

    </div>
  );
};

export default Register;