import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPage: 1,
  categoryId: 0,
  sortType: {
    name: "популярности",
    sortProperty: "rating",
  },
  searchValue: "",
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryId: (state, action) => {
      state.categoryId = action.payload;
    },
    setSortType: (state, action) => {
      state.sortType = action.payload;
    },
    setSearch: (state, action) => {
      state.searchValue = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setFilters: (state, action) => {
      state.categoryId = +action.payload.categoryId;
      state.sortType = action.payload.sortType;
      state.currentPage = +action.payload.currentPage;
    },
  },
});

export const { setCategoryId, setSortType, setSearch, setCurrentPage, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
