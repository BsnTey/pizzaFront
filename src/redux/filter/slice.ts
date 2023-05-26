import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IFilterSlice, IsortBy } from "./types";

export enum sortPropertyEnum {
  RATING_ASK = "rating",
  RATING_DESK = "-rating",
  PRICE_ASK = "price",
  PRICE_DESK = "-price",
  TITLE_ASK = "title",
  TITLE_DESK = "-title",
}

const initialState: IFilterSlice = {
  currentPage: 1,
  categoryId: 0,
  sortBy: {
    name: "популярности",
    sortProperty: sortPropertyEnum.RATING_ASK,
  },
  searchValue: "",
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryId: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload;
    },
    setSortBy: (state, action: PayloadAction<IsortBy>) => {
      state.sortBy = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setFilters: (state, action: PayloadAction<IFilterSlice>) => {
      if (Object.keys(action.payload).length) {
        state.categoryId = action.payload.categoryId;
        state.sortBy = action.payload.sortBy;
        state.currentPage = action.payload.currentPage;
      } else {
        state.categoryId = 0;
        state.sortBy = {
          name: "популярности",
          sortProperty: sortPropertyEnum.RATING_ASK,
        };
        state.currentPage = 1;
      }
    },
  },
});

export const { setCategoryId, setSortBy, setSearch, setCurrentPage, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
