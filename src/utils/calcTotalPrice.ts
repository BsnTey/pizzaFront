import { ICartItem } from "../redux/cart/types";

export const calcTotalPrice = (items: ICartItem[]) => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};
