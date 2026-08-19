import React from "react";

const Terms = () => {
  return (
    <div className="service-page">

      <style>{`
        .service-page {
          min-height: 75vh;
          padding: 70px 8%;
          color: #ffffff;

          background:
            radial-gradient(
              circle at 85% 20%,
              rgba(255, 80, 0, 0.13),
              transparent 35%
            ),
            radial-gradient(
              circle at 15% 50%,
              rgba(80, 30, 100, 0.12),
              transparent 40%
            ),
            #050505;
        }

        .service-container {
          max-width: 900px;
          margin: auto;
        }

        .service-page h1 {
          color: #ffffff;
          font-size: 42px;
          font-weight: 700;
          margin-bottom: 30px;
        }

        .service-page h1 span {
          color: #ff7a00;
        }

        .terms-section {
          background: #0b0b0b;
          border: 1px solid #1c1c1c;
          border-radius: 12px;
          padding: 25px;
          margin-bottom: 18px;
          transition: 0.3s;
        }

        .terms-section:hover {
          border-color: #ff7a00;
        }

        .terms-section h2 {
          color: #ff7a00;
          font-size: 20px;
          margin-bottom: 10px;
        }

        .terms-section p {
          color: #aaaaaa;
          line-height: 1.8;
          font-size: 14px;
        }
      `}</style>

      <div className="service-container">

        <h1>
          Terms & <span>Conditions</span>
        </h1>

        <div className="terms-section">
          <h2>Use of Website</h2>

          <p>
            By using ShopNest, you agree to use the website responsibly
            and follow these terms and conditions.
          </p>
        </div>

        <div className="terms-section">
          <h2>Orders</h2>

          <p>
            Product availability, prices and order details may change
            without prior notice.
          </p>
        </div>

        <div className="terms-section">
          <h2>Payments</h2>

          <p>
            Customers are responsible for providing accurate payment
            and billing information when placing an order.
          </p>
        </div>

        <div className="terms-section">
          <h2>Changes to Terms</h2>

          <p>
            ShopNest reserves the right to update these terms when
            necessary.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Terms;