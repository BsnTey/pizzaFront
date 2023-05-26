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
