import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import "../styles/auth.css";

const VerifyOTP = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Register page se email receive hogi
  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      alert("Email not found. Please register again.");
      navigate("/register");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        "http://localhost:5000/api/auth/verify-otp",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email,
            otp,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("Email verified successfully! 🎉");

        navigate("/login");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("OTP Verification Error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-logo">
          ShopNest
        </div>

        <h1>Verify Your Email</h1>

        <p className="auth-subtitle">
          Enter the OTP sent to your email
        </p>

        <p className="verify-email">
          {email}
        </p>

        <form onSubmit={handleSubmit}>

          <div className="auth-input-group">

            <label>Enter OTP</label>

            <input
              type="text"
              name="otp"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength="6"
              required
            />

          </div>

          <button
            type="submit"
            className="auth-btn"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify Email"}
          </button>

        </form>

        <p className="auth-switch">
          Already verified?

          <Link to="/login">
            Login
          </Link>
        </p>

      </div>

    </div>
  );
};

export default VerifyOTP;