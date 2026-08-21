import React from "react";

const FAQs = () => {
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
          margin-bottom: 35px;
        }

        .service-page h1 span {
          color: #ff7a00;
        }

        .faq-item {
          background: #0b0b0b;
          border: 1px solid #1c1c1c;
          border-radius: 12px;
          padding: 22px;
          margin-bottom: 15px;
          transition: 0.3s;
        }

        .faq-item:hover {
          border-color: #ff7a00;
          transform: translateY(-2px);
        }

        .faq-item h3 {
          color: #ffffff;
          font-size: 17px;
          margin-bottom: 10px;
        }

        .faq-item p {
          color: #aaaaaa;
          line-height: 1.7;
          font-size: 14px;
        }
      `}</style>

      <div className="service-container">

        <h1>
          Frequently Asked <span>Questions</span>
        </h1>

        <div className="faq-item">
          <h3>How can I place an order?</h3>

          <p>
            Browse our products, add your desired items to the cart
            and proceed to checkout.
          </p>
        </div>

        <div className="faq-item">
          <h3>Can I remove an item from my cart?</h3>

          <p>
            Yes. You can remove products or change their quantity
            from your cart page.
          </p>
        </div>

        <div className="faq-item">
          <h3>How can I contact ShopNest?</h3>

          <p>
            You can contact us through email or phone using our
            Contact Us page.
          </p>
        </div>

        <div className="faq-item">
          <h3>Is my information secure?</h3>

          <p>
            We take reasonable measures to protect customer information
            and provide a secure shopping experience.
          </p>
        </div>

      </div>
    </div>
  );
};

export default FAQs;