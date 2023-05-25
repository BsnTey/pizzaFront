import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "../redux/slice/filterSlice";
import cartSlice from "../redux/slice/cartSlice";
import pizzaSlice from "../redux/slice/pizzaSlice";

export const store = configureStore({
  reducer: {
    filter: filterSlice,
    cart: cartSlice,
    pizza: pizzaSlice,
  },
});
