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
    //Persist data in localStorage
    this.persistDataList();
    return item;
  }
  deleteItem(id) {
    const index = this.items.findIndex((el) => el.id === id);
    this.items.splice(index, 1);
    //Persist data in localStorage
    this.persistDataList();
  }
  updateCount(id, newCount) {
    this.items.find((el) => el.id === id).count = newCount;
  }
  getNumItems() {
    return this.items.length;
  }
  persistDataList() {
    localStorage.setItem("items", JSON.stringify(this.items));
  }
  readStorageList() {
    const storage = JSON.parse(localStorage.getItem("items"));
    //Restore likes from the localStorage
    if (storage) this.items = storage;
  }
  deleteAllItems() {
    this.items = [];
    this.persistDataList();
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
