import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizza = createAsyncThunk("pizza/fetchPizza", async ({ category, search, sortBy, order, currentPage }) => {
  const URL = `https://646771742ea3cae8dc2f14d4.mockapi.io/api/items?page=${currentPage}&limit=4&${category}${search}sortBy=${sortBy}&order=${order}`;
  const res = await axios.get(URL);
  return res.data;
});

const initialState = {
  items: [],
  status: "loading",
};

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizza.pending, (state) => {
        state.items = [];
        state.status = "loading";
      })
      .addCase(fetchPizza.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "success";
      })
      .addCase(fetchPizza.rejected, (state) => {
        state.items = [];
        state.status = "error";
      });
  },
});

export const selectPizza = (state) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
