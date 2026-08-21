import { createSlice } from "@reduxjs/toolkit";

// Get cart from LocalStorage
const savedCart = localStorage.getItem("cartItems");

const initialState = {
  cartItems: savedCart ? JSON.parse(savedCart) : [],
};

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {

    // =========================
    // ADD TO CART
    // =========================
    addToCart: (state, action) => {
      const item = action.payload;

      const existingItem = state.cartItems.find(
        (x) => x._id === item._id
      );

      if (existingItem) {

        existingItem.quantity += 1;

      } else {

        state.cartItems.push({
          ...item,
          quantity: 1,
        });

      }

      localStorage.setItem(
        "cartItems",
        JSON.stringify(state.cartItems)
      );
    },


    // =========================
    // INCREASE QUANTITY
    // =========================
    increaseQuantity: (state, action) => {

      const item = state.cartItems.find(
        (x) => x._id === action.payload
      );

      if (item) {
        item.quantity += 1;
      }

      localStorage.setItem(
        "cartItems",
        JSON.stringify(state.cartItems)
      );
    },


    // =========================
    // DECREASE QUANTITY
    // =========================
    decreaseQuantity: (state, action) => {

      const item = state.cartItems.find(
        (x) => x._id === action.payload
      );

      if (item) {

        if (item.quantity > 1) {

          item.quantity -= 1;

        } else {

          state.cartItems = state.cartItems.filter(
            (x) => x._id !== action.payload
          );

        }
      }

      localStorage.setItem(
        "cartItems",
        JSON.stringify(state.cartItems)
      );
    },


    // =========================
    // REMOVE PRODUCT
    // =========================
    removeFromCart: (state, action) => {

      state.cartItems = state.cartItems.filter(
        (x) => x._id !== action.payload
      );

      localStorage.setItem(
        "cartItems",
        JSON.stringify(state.cartItems)
      );
    },


    // =========================
    // CLEAR CART
    // =========================
    clearCart: (state) => {

      state.cartItems = [];

      localStorage.removeItem("cartItems");
    },

  },
});


// Export actions
export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;


// Export reducer
export default cartSlice.reducer;