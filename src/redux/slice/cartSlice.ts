import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type ICartItem = {
  id: string;
  imageUrl: string;
  title: string;
  type: number;
  size: number;
  price: number;
  quantity: number;
};

export interface ICartSlice {
  totalPrice: number;
  items: ICartItem[];
}

const initialState: ICartSlice = {
  totalPrice: 0,
  items: [],
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

const totalPriceCalc = (state: ICartSlice) => {
  return state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<ICartItem>) => {
      const findItem = findItemOnCart(state, action);

      findItem ? findItem.quantity++ : state.items.push({ ...action.payload, quantity: 1 });

      state.totalPrice = totalPriceCalc(state);
    },
    removeItemQuantity: (state, action: PayloadAction<ICartItem>) => {
      const findItem = findItemOnCart(state, action);

      if (findItem) {
        if (findItem.quantity === 1) {
          state.items = deleteItemOnCart(state, action);
        } else {
          findItem.quantity--;
        }

        state.totalPrice = totalPriceCalc(state);
      }
    },

    removeItems: (state, action: PayloadAction<ICartItem>) => {
      state.items = deleteItemOnCart(state, action);
      state.totalPrice = totalPriceCalc(state);
    },

    clearItems: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state: RootState) => state.cart;
export const selectCartItemById = (id: string) => (state: RootState) => state.cart.items.find((el) => el.id === id);

export const { addItem, removeItemQuantity, removeItems, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
