import uniqid from "uniqid";
import { elements } from "../views/base";

export default class List {
  constructor() {
    this.items = [];
  }

  addItem(count, unit, ingredient) {
    const item = {
      id: uniqid(),
      count,
      unit,
      ingredient,
    };
    this.items.push(item);
    return item;
  }
  deleteItem(id) {
    const index = this.items.findIndex((el) => el.id === id);
    this.items.splice(index, 1);
  }
  updateCount(id, newCount) {
    this.items.find((el) => el.id === id).count = newCount;
  }
}
export const showCart = () => {
  elements.cartOverlay.classList.add("transparentBcg");
  elements.cartDOM.classList.add("showCart");
};
export const hideCart = () => {
  elements.cartOverlay.classList.remove("transparentBcg");
  elements.cartDOM.classList.remove("showCart");
};
