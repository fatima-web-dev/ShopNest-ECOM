import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import { clearCart } from "../redux/cartSlice";

import "../styles/checkout.css";


const Checkout = () => {
  const { login } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector(
    (state) => state.cart.cartItems
  );


  // ================================
  // PAYMENT METHOD
  // ================================

  const [paymentMethod, setPaymentMethod] =
    useState("cod");


  // ================================
  // FORM DATA
  // ================================

  const [formData, setFormData] = useState({

    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Pakistan",

  });


  // ================================
  // TOTAL
  // ================================

  const totalPrice = cartItems.reduce(

    (total, item) =>
      total +
      Number(item.price) *
      item.quantity,

    0

  );


  // ================================
  // INPUT CHANGE
  // ================================

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,

    });

  };


  // =====================================================
  // CREATE DATABASE ORDER
  // =====================================================

  const createDatabaseOrder = async (paymentId = "") => {

    const orderData = {

      products: cartItems.map(
        (item) => ({

          product: item._id,

          quantity:
            item.quantity,

          price:
            Number(item.price),

        })
      ),

      totalAmount:
        totalPrice,


      address: {

        fullName:
          formData.name,

        street:
          formData.address,

        city:
          formData.city,

        postalCode:
          formData.postalCode,

        country:
          formData.country,

      },


      paymentId:
        paymentId,

    };


    const token =
      localStorage.getItem("token");


    const res = await fetch(

      "http://localhost:5000/api/orders",

      {

        method: "POST",

        headers: {

          "Content-Type":
            "application/json",

          Authorization:
            `Bearer ${token}`,

        },

        body:
          JSON.stringify(orderData),

      }

    );


    const data =
      await res.json();


    if (!res.ok) {

      throw new Error(

        data.message ||
        "Order creation failed"

      );

    }


    return data;

  };


  // =====================================================
  // COD
  // =====================================================

  const handleCOD = async () => {

    try {

      await createDatabaseOrder("");

      alert(
        "Order placed successfully! 🎉"
      );

      dispatch(clearCart());

      navigate("/");


    } catch (error) {

      console.error(error);

      alert(
        error.message
      );

    }

  };


  // =====================================================
  // RAZORPAY
  // =====================================================

  const handleRazorpay = async () => {

    try {


            // ---------------------------------------
      // STEP 1
      // Create our MongoDB order
      // ---------------------------------------

      const databaseOrder =
        await createDatabaseOrder("");


      console.log(
        "MongoDB Order:",
        databaseOrder
      );

      // ---------------------------------------
      // STEP 2
      // Create Razorpay order
      // ---------------------------------------

      const token =
        localStorage.getItem("token");


      const response =
        await fetch(

          "http://localhost:5000/api/payments/order",

          {

            method: "POST",

            headers: {

              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`,

            },

            body: JSON.stringify({

              amount:
                totalPrice,

              currency:
                "INR",

              receipt:
                `receipt_${Date.now()}`,

            }),

          }

        );


      const razorpayOrder =
        await response.json();


      if (!response.ok) {

        throw new Error(

          razorpayOrder.message ||
          "Unable to create Razorpay order"

        );

      }


      console.log(
        "Razorpay Order:",
        razorpayOrder
      );





      // ---------------------------------------
      // STEP 3
      // Open Razorpay Checkout
      // ---------------------------------------

      const options = {

        key:
          "YOUR_RAZORPAY_KEY_ID",

        amount:
          razorpayOrder.amount,

        currency:
          razorpayOrder.currency,

        name:
          "ShopNest",

        description:
          "ShopNest Order Payment",

        order_id:
          razorpayOrder.id,


        prefill: {

          name:
            formData.name,

          email:
            formData.email,

          contact:
            formData.phone,

        },


        theme: {

          color:
            "#ff7a00",

        },


        handler:
          async function (paymentResponse) {

            console.log(
              "Payment Response:",
              paymentResponse
            );


            // --------------------------------
            // STEP 4
            // Verify payment
            // --------------------------------

            const verifyResponse =
              await fetch(

                "http://localhost:5000/api/payments/verify",

                {

                  method: "POST",

                  headers: {

                    "Content-Type":
                      "application/json",

                    Authorization:
                      `Bearer ${token}`,

                  },

                  body:
                    JSON.stringify({

                      orderId:
                        databaseOrder._id,

                      razorpay_order_id:
                        paymentResponse
                          .razorpay_order_id,

                      razorpay_payment_id:
                        paymentResponse
                          .razorpay_payment_id,

                      razorpay_signature:
                        paymentResponse
                          .razorpay_signature,

                    }),

                }

              );


            const verifyData =
              await verifyResponse.json();


            if (!verifyResponse.ok) {

              alert(
                verifyData.message ||
                "Payment verification failed"
              );

              return;

            }


            // --------------------------------
            // SUCCESS
            // --------------------------------

            alert(
              "Payment successful! 🎉"
            );


            dispatch(
              clearCart()
            );


            navigate("/");

          },

      };


      // ---------------------------------------
      // STEP 5
      // Open Razorpay
      // ---------------------------------------

      const razorpay =
        new window.Razorpay(options);


      razorpay.open();


    } catch (error) {

      console.error(
        "Razorpay Error:",
        error
      );


      alert(
        error.message ||
        "Payment failed"
      );

    }

  };


  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async (e) => {

    e.preventDefault();


    if (
      paymentMethod === "cod"
    ) {

      await handleCOD();

    } else {

      await handleRazorpay();

    }

  };


  // =====================================================
  // EMPTY CART
  // =====================================================

  if (
    cartItems.length === 0
  ) {

    return (

      <div className="checkout-empty">

        <h1>
          Your Cart is Empty 🛒
        </h1>

        <p>
          Please add products
          before checkout.
        </p>

      </div>

    );

  }


  // =====================================================
  // UI
  // =====================================================

  return (

    <div className="checkout-page">

      <h1 className="checkout-title">
        Checkout
      </h1>


      <div className="checkout-container">


        {/* ==================================
            CUSTOMER FORM
        ================================== */}

        <div className="checkout-form-card">

          <h2>
            Customer Information
          </h2>


          <form
            onSubmit={handleSubmit}
          >


            <div className="form-group">

              <label>
                Full Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />

            </div>


            <div className="form-group">

              <label>
                Email
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />

            </div>


            <div className="form-group">

              <label>
                Phone
              </label>

              <input
                type="tel"
                name="phone"
                placeholder="03XX XXXXXXX"
                value={formData.phone}
                onChange={handleChange}
                required
              />

            </div>


            <div className="form-group">

              <label>
                Address
              </label>

              <textarea
                name="address"
                placeholder="Enter your complete address"
                value={formData.address}
                onChange={handleChange}
                required
              />

            </div>


            <div className="form-group">

              <label>
                City
              </label>

              <input
                type="text"
                name="city"
                placeholder="Enter your city"
                value={formData.city}
                onChange={handleChange}
                required
              />

            </div>


            <div className="form-group">

              <label>
                Postal Code
              </label>

              <input
                type="text"
                name="postalCode"
                placeholder="Enter postal code"
                value={formData.postalCode}
                onChange={handleChange}
                required
              />

            </div>


            <div className="form-group">

              <label>
                Country
              </label>

              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
              />

            </div>


            {/* ==================================
                PAYMENT METHODS
            ================================== */}

            <h2 className="payment-title">
              Payment Method
            </h2>


            {/* COD */}

            <label
              className={`payment-option ${
                paymentMethod === "cod"
                  ? "selected"
                  : ""
              }`}
            >

              <input
                type="radio"
                name="payment"
                value="cod"
                checked={
                  paymentMethod === "cod"
                }
                onChange={() =>
                  setPaymentMethod(
                    "cod"
                  )
                }
              />


              <div>

                <strong>
                  Cash on Delivery
                </strong>

                <p>
                  Pay when your
                  order arrives.
                </p>

              </div>

            </label>


            {/* RAZORPAY */}

            <label
              className={`payment-option ${
                paymentMethod === "razorpay"
                  ? "selected"
                  : ""
              }`}
            >

              <input
                type="radio"
                name="payment"
                value="razorpay"
                checked={
                  paymentMethod ===
                  "razorpay"
                }
                onChange={() =>
                  setPaymentMethod(
                    "razorpay"
                  )
                }
              />


              <div>

                <strong>
                  Pay Online with Razorpay
                </strong>

                <p>
                  Secure online payment.
                </p>

              </div>

            </label>


            <button
              type="submit"
              className="place-order-btn"
            >

              {paymentMethod === "cod"

                ? "Place Order"

                : "Pay with Razorpay"

              }

            </button>


          </form>

        </div>


        {/* ==================================
            ORDER SUMMARY
        ================================== */}

        <div className="checkout-summary">

          <h2>
            Order Summary
          </h2>


          {cartItems.map(
            (item) => (

              <div
                className="checkout-product"
                key={item._id}
              >

                <img
                  src={item.imageUrl}
                  alt={item.name}
                />

                <div>

                  <h3>
                    {item.name}
                  </h3>

                  <p>

                    {item.quantity}
                    {" × "}

                    $
                    {Number(
                      item.price
                    ).toFixed(2)}

                  </p>

                </div>

              </div>

            )
          )}


          <div className="checkout-total">

            <span>
              Total
            </span>

            <strong>

              $
              {totalPrice.toFixed(2)}

            </strong>

          </div>

        </div>


      </div>

    </div>

  );

};


export default Checkout;