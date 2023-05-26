import { Status } from "./slice";

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
