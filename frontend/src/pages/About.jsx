import React from "react";

const About = () => {
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
          margin-bottom: 20px;
        }

        .service-page h1 span {
          color: #ff7a00;
        }

        .service-page h2 {
          color: #ff7a00;
          font-size: 22px;
          margin-bottom: 12px;
        }

        .service-page p {
          color: #aaaaaa;
          line-height: 1.8;
          font-size: 15px;
        }

        .about-card {
          margin-top: 35px;
          padding: 30px;
          background: #0b0b0b;
          border: 1px solid #1c1c1c;
          border-radius: 12px;
        }

        .about-card h2:not(:first-child) {
          margin-top: 30px;
        }
      `}</style>

      <div className="service-container">

        <h1>
          About <span>ShopNest</span>
        </h1>

        <p>
          Welcome to ShopNest, your one-stop online shopping destination.
          We provide quality products at affordable prices with a simple
          and convenient shopping experience.
        </p>

        <div className="about-card">

          <h2>Who We Are</h2>

          <p>
            ShopNest is a modern e-commerce platform designed to make
            online shopping simple, secure and enjoyable. Our goal is to
            provide customers with a wide range of quality products and
            a smooth shopping experience.
          </p>

          <h2>Our Mission</h2>

          <p>
            Our mission is to connect customers with quality products
            while providing reliable service, affordable prices and an
            easy-to-use online store.
          </p>

          <h2>Why ShopNest?</h2>

          <p>
            We focus on simple navigation, quality products and a
            customer-friendly shopping experience.
          </p>

        </div>

      </div>
    </div>
  );
};

export default About;