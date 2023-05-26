import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchPizza } from "./asyncActions";
import { IPizza, IPizzaSlice } from "./types";

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

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

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
