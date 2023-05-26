import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

export type IPizza = {
  id: string;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
};

enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export interface IPizzaSlice {
  items: IPizza[];
  status: Status;
}

export type IFetchPizza = {
  category: string;
  search: string;
  sortBy: string;
  order: string;
  currentPage: number;
};

export const fetchPizza = createAsyncThunk<IPizza[], IFetchPizza>("pizza/fetchPizza", async ({ category, search, sortBy, order, currentPage }) => {
  const URL = `https://646771742ea3cae8dc2f14d4.mockapi.io/api/items?page=${currentPage}&limit=4&${category}${search}sortBy=${sortBy}&order=${order}`;
  const { data } = await axios.get<IPizza[]>(URL);
  return data;
});

const initialState: IPizzaSlice = {
  items: [],
  status: Status.LOADING,
};

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<IPizza[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizza.pending, (state) => {
        state.items = [];
        state.status = Status.LOADING;
      })
      .addCase(fetchPizza.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = Status.SUCCESS;
      })
      .addCase(fetchPizza.rejected, (state) => {
        state.items = [];
        state.status = Status.ERROR;
      });
  },
});

export const selectPizza = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
