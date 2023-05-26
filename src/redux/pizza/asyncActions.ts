import { createAsyncThunk } from "@reduxjs/toolkit";
import { IFetchPizza, IPizza } from "./types";
import axios from "axios";

export const fetchPizza = createAsyncThunk<IPizza[], IFetchPizza>("pizza/fetchPizza", async ({ category, search, sortBy, order, currentPage }) => {
  const URL = `https://646771742ea3cae8dc2f14d4.mockapi.io/api/items?page=${currentPage}&limit=4&${category}${search}sortBy=${sortBy}&order=${order}`;
  const { data } = await axios.get<IPizza[]>(URL);
  return data;
});
