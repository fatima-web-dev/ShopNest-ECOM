import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


import {
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} from "../redux/cartSlice";

import "../styles/cart.css";


const Cart = () => {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const cartItems = useSelector(
    (state) => state.cart.cartItems
  );


  // Calculate total
  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + Number(item.price) * item.quantity,
    0
  );


  // Empty cart
  if (cartItems.length === 0) {

    return (
      <div className="cart-page">

        <div className="empty-cart">

          <h1>Your Cart is Empty 🛒</h1>

          <p>
            Add some products to your cart to see them here.
          </p>

        </div>

      </div>
    );
  }


  return (

    <div className="cart-page">

      <h1 className="cart-title">
        Shopping Cart
      </h1>


      <div className="cart-container">


        {/* =========================
            CART ITEMS
        ========================= */}

        <div className="cart-items">

          {cartItems.map((item) => (

            <div
              className="cart-item"
              key={item._id}
            >


              {/* IMAGE */}

              <img
                src={item.imageUrl}
                alt={item.name}
                className="cart-item-image"
              />


              {/* PRODUCT INFO */}

              <div className="cart-item-info">

                <h2>
                  {item.name}
                </h2>


                <p className="cart-item-price">
                  ${Number(item.price).toFixed(2)}
                </p>


                {/* QUANTITY */}

                <div className="quantity-control">

                  <button
                    onClick={() =>
                      dispatch(
                        decreaseQuantity(item._id)
                      )
                    }
                  >
                    −
                  </button>


                  <span>
                    {item.quantity}
                  </span>


                  <button
                    onClick={() =>
                      dispatch(
                        increaseQuantity(item._id)
                      )
                    }
                  >
                    +
                  </button>

                </div>


                {/* SUBTOTAL */}

                <p className="item-subtotal">

                  Subtotal: $

                  {(
                    Number(item.price) *
                    item.quantity
                  ).toFixed(2)}

                </p>


                {/* REMOVE */}

                <button
                  className="remove-btn"
                  onClick={() =>
                    dispatch(
                      removeFromCart(item._id)
                    )
                  }
                >
                  Remove
                </button>

              </div>

            </div>

          ))}

        </div>


        {/* =========================
            CART SUMMARY
        ========================= */}

        <div className="cart-summary">

          <h2>
            Cart Summary
          </h2>


          <div className="summary-row">

            <span>
              Products
            </span>

            <span>
              {cartItems.reduce(
                (total, item) =>
                  total + item.quantity,
                0
              )}
            </span>

          </div>


          <div className="summary-row">

            <span>
              Total
            </span>

            <strong>
              ${totalPrice.toFixed(2)}
            </strong>

          </div>

           
          <button
            className="checkout-btn"
            onClick={() => navigate("/checkout")}
            >
            Proceed to Checkout
            </button>


          <button
            className="clear-cart-btn"
            onClick={() =>
              dispatch(clearCart())
            }
          >
            Clear Cart
          </button>

        </div>

      </div>

    </div>

  );
};


export default Cart;