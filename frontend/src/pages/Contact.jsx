import React from "react";

const Contact = () => {
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
          margin-bottom: 15px;
        }

        .service-page h1 span {
          color: #ff7a00;
        }

        .intro-text {
          color: #aaaaaa;
          line-height: 1.8;
          margin-bottom: 35px;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .contact-card {
          background: #0b0b0b;
          border: 1px solid #1c1c1c;
          border-radius: 12px;
          padding: 25px;
          transition: 0.3s;
        }

        .contact-card:hover {
          transform: translateY(-4px);
          border-color: #ff7a00;
        }

        .contact-card h3 {
          color: #ff7a00;
          font-size: 18px;
          margin-bottom: 10px;
        }

        .contact-card p {
          color: #aaaaaa;
          line-height: 1.7;
          font-size: 14px;
        }

        @media (max-width: 700px) {
          .contact-grid {
            grid-template-columns: 1fr;
          }

          .service-page h1 {
            font-size: 34px;
          }
        }
      `}</style>

      <div className="service-container">

        <h1>
          Contact <span>Us</span>
        </h1>

        <p className="intro-text">
          Have a question or need help? Our customer service team is
          here to help you.
        </p>

        <div className="contact-grid">

          <div className="contact-card">
            <h3>Email</h3>
            <p>support@shopnest.com</p>
          </div>

          <div className="contact-card">
            <h3>Phone</h3>
            <p>+92 300 1234567</p>
          </div>

          <div className="contact-card">
            <h3>Business Hours</h3>
            <p>
              Monday - Saturday
              <br />
              9:00 AM - 6:00 PM
            </p>
          </div>

          <div className="contact-card">
            <h3>Location</h3>
            <p>Pakistan</p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Contact;