import React from "react";

const Privacy = () => {
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

        .privacy-section {
          background: #0b0b0b;
          border: 1px solid #1c1c1c;
          border-radius: 12px;
          padding: 25px;
          margin-bottom: 18px;
          transition: 0.3s;
        }

        .privacy-section:hover {
          border-color: #ff7a00;
        }

        .privacy-section h2 {
          color: #ff7a00;
          font-size: 20px;
          margin-bottom: 10px;
        }

        .privacy-section p {
          color: #aaaaaa;
          line-height: 1.8;
          font-size: 14px;
        }
      `}</style>

      <div className="service-container">

        <h1>
          Privacy <span>Policy</span>
        </h1>

        <div className="privacy-section">
          <h2>Information We Collect</h2>

          <p>
            We may collect information such as your name, email address,
            contact information and order details when you use our website.
          </p>
        </div>

        <div className="privacy-section">
          <h2>How We Use Information</h2>

          <p>
            Your information may be used to process orders, provide
            customer support and improve our services.
          </p>
        </div>

        <div className="privacy-section">
          <h2>Data Security</h2>

          <p>
            We take reasonable steps to protect your information from
            unauthorized access or misuse.
          </p>
        </div>

        <div className="privacy-section">
          <h2>Contact</h2>

          <p>
            If you have questions about this Privacy Policy, please
            contact us at support@shopnest.com.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Privacy;