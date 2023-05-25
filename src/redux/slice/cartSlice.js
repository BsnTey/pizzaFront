import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const findItem = state.items.find((obj) => {
        return obj.id === action.payload.id && obj.type === action.payload.type && obj.size === action.payload.size;
      });
      findItem ? findItem.quantity++ : state.items.push({ ...action.payload, quantity: 1 });

      state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
    removeItemQuantity: (state, action) => {
      const findItem = state.items.find((item) => {
        return item.id === action.payload.id && item.type === action.payload.type && item.size === action.payload.size;
      });

      if (findItem) {
        if (findItem.quantity === 1) {
          state.items = state.items.filter((item) => item.id !== action.payload.id || item.type !== action.payload.type || item.size !== action.payload.size);
        } else {
          findItem.quantity--;
        }

        state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      }
    },

    removeItems: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id || item.type !== action.payload.type || item.size !== action.payload.size);
      state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },

    clearItems: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state) => state.cart;

export const { addItem, removeItemQuantity, removeItems, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
