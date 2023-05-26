import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ICartItem, ICartSlice } from "./types";
import { getCartFromLS } from "../../utils/getCartFromLS";
import { calcTotalPrice } from "../../utils/calcTotalPrice";

const { items, totalPrice } = getCartFromLS();

const initialState: ICartSlice = {
  items: items,
  totalPrice: totalPrice,
};

const findItemOnCart = (state: ICartSlice, action: PayloadAction<ICartItem>) => {
  return state.items.find((item) => {
    return item.id === action.payload.id && item.type === action.payload.type && item.size === action.payload.size;
  });
};

const deleteItemOnCart = (state: ICartSlice, action: PayloadAction<ICartItem>) => {
  return state.items.filter((item) => {
    return item.id !== action.payload.id || item.type !== action.payload.type || item.size !== action.payload.size;
  });
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<ICartItem>) => {
      const findItem = findItemOnCart(state, action);

      findItem ? findItem.quantity++ : state.items.push({ ...action.payload, quantity: 1 });

      state.totalPrice = calcTotalPrice(state.items);
    },
    removeItemQuantity: (state, action: PayloadAction<ICartItem>) => {
      const findItem = findItemOnCart(state, action);

      if (findItem) {
        if (findItem.quantity === 1) {
          state.items = deleteItemOnCart(state, action);
        } else {
          findItem.quantity--;
        }

        state.totalPrice = calcTotalPrice(state.items);
      }
    },

    removeItems: (state, action: PayloadAction<ICartItem>) => {
      state.items = deleteItemOnCart(state, action);
      state.totalPrice = calcTotalPrice(state.items);
    },

    clearItems: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItemQuantity, removeItems, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
