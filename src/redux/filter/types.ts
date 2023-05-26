import { sortPropertyEnum } from "./slice";

export type IsortBy = {
  name: string;
  sortProperty: sortPropertyEnum;
};

export interface IFilterSlice {
  currentPage: number;
  categoryId: number;
  sortBy: IsortBy;
  searchValue: string;
}
