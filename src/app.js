import "./main.scss";

const cartBtn = document.querySelector(".cart-btn");
const closeCartBtn = document.querySelector(".cart__close");
const clearCartBtn = document.querySelector(".clear__cart");
const cartDOM = document.querySelector(".cart__wrapper");
const cartOverlay = document.querySelector(".cart");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart__total");
const cartContent = document.querySelector(".cart__content");
const productsDOM = document.querySelector(".products__center");
//CART
let cart = [];
//buttons
let buttonsDOM = [];

//GETTING THE PRODUCTS
class Products {
  async getProducts() {
    try {
      let result = await fetch("products.json");
      let data = await result.json();
      let products = data.items;
      products = products.map((item) => {
        const { title, calories } = item.fields;
        const { id } = item.sys;
        const image = item.fields.image.fields.file.url;
        return { title, calories, id, image };
      });
      return products;
    } catch (error) {
      console.log(error);
    }
  }
}
class Meat {
  async getMeat() {
    try {
      let result = await fetch("meat.json");
      let data = await result.json();
      let meat = data.items;
      meat = meat.map((item) => {
        const { title, calories } = item.fields;
        const { id } = item.sys;
        const image = item.fields.image.fields.file.url;
        return { title, calories, id, image };
      });
      return meat;
    } catch (error) {
      console.log(error);
    }
  }
}
//DISPLAY ALL MEALS
class UI {
  displayProducts(products) {
    let result = "";
    products.forEach((product) => {
      result += `
            <article class="product">
                <div class="img__container">
                    <img src=${product.image} alt="product" class="product__img">
                    <button class="bag__btn" data-id=${product.id}>
                        <i class="fas fa__shopping-cart"></i>
                        dodaj do listy
                    </button>
                </div>
                <h3>${product.title}</h3>
                <h4>${product.calories} kcal</h4>
            </article>
        `;
    });
    productsDOM.innerHTML = result;
  }

  displayMeat(meat) {
    let result = "";
    meat.forEach((meat) => {
      result += `
            <article class="product">
                <div class="img__container">
                    <img src=${meat.image} alt="product" class="product__img">
                    <button class="bag__btn" data-id=${meat.id}>
                        <i class="fas fa-shopping-cart"></i>
                        dodaj do listy
                    </button>
                </div>
                <h3>${meat.title}</h3>
                <h4>${meat.calories} kcal</h4>
            </article>
        `;
    });
    productsDOM.innerHTML = result;
  }
  //funkcja pobierajaca przycisk z kart, musimy ja dodac po wczystaniu kart
  getBagButtons() {
    const buttons = [...document.querySelectorAll(".bag__btn")];
    buttonsDOM = buttons;
    buttons.forEach((button) => {
      let id = button.dataset.id;
      let inCard = cart.find((item) => item.id === id);
      if (inCard) {
        button.innerText = "Dodano do koszyka";
        button.disabled = true;
      }
      button.addEventListener("click", (e) => {
        e.target.innerText = "Dodano do koszyka";
        e.target.disabled = true;
        //get product from products
        let cartItem = { ...Storage.getProduct(id), amount: 1 };
        //add product to the cart
        cart = [...cart, cartItem];
        //save cart in local storage
        Storage.saveCart(cart);
        //set cart values
        this.setCartValues(cart);
        //display cart item
        this.addCartItem(cartItem);
        //show the cart
        this.showCart();
      });
    });
  }
  setCartValues(cart) {
    let tempTotal = 0;
    let itemsTotal = 0;
    cart.map((item) => {
      tempTotal += item.calories * item.amount;
      itemsTotal += item.amount;
    });
    cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
    cartItems.innerText = itemsTotal;
  }
  addCartItem(item) {
    const div = document.createElement("div");
    div.classList.add("cart__item");
    div.innerHTML = `<img src=${item.image} alt="product">
                    <div>
                        <h4>${item.title}</h4>
                        <h5>${item.calories}</h5>
                        <span class="remove-item" data-id=${item.id}>remove</span>
                    </div>
                    <div>
                        <i class="fas fa-chevron-up" data-id=${item.id}></i>
                        <p class="item-amount">${item.amount}</p>
                        <i class="fas fa-chevron-down" data-id=${item.id}></i>
                    </div>`;
    cartContent.appendChild(div);
  }
  showCart() {
    cartOverlay.classList.add("transparentBcg");
    cartDOM.classList.add("showCart");
  }
  setupAPP() {
    cart = Storage.getCart();
    this.setCartValues(cart);
    this.populateCart(cart);
    cartBtn.addEventListener("click", this.showCart);
    closeCartBtn.addEventListener("click", this.hideCart);
  }
  populateCart(cart) {
    cart.forEach((item) => this.addCartItem(item));
  }
  hideCart() {
    cartOverlay.classList.remove("transparentBcg");
    cartDOM.classList.remove("showCart");
  }
  cartLogic() {
    //clear cart button
    clearCartBtn.addEventListener("click", () => {
      this.clearCart();
    });
    //cart functionality
    cartContent.addEventListener("click", (event) => {
      if (event.target.classList.contains("remove-item")) {
        let removeItem = event.target;
        let id = removeItem.dataset.id;
        cartContent.removeChild(removeItem.parentElement.parentElement);
        this.removeItem(id);
      } else if (event.target.classList.contains("fa-chevron-up")) {
        let addAmount = event.target;
        let id = addAmount.dataset.id;
        let tempItem = cart.find((item) => item.id === id);
        tempItem.amount = tempItem.amount + 1;
        Storage.saveCart(cart);
        this.setCartValues(cart);
        addAmount.nextElementSibling.innerText = tempItem.amount;
      } else if (event.target.classList.contains("fa-chevron-down")) {
        let lowerAmount = event.target;
        let id = lowerAmount.dataset.id;
        let tempItem = cart.find((item) => item.id === id);
        if (tempItem.amount > 0) {
          Storage.saveCart(cart);
          this.setCartValues(cart);
          tempItem.amount = tempItem.amount - 1;
          lowerAmount.previousElementSibling.innerText = tempItem.amount;
        } else {
          cartContent.removeChild(lowerAmount.parentElement.parentElement);
          this.removeItem(id);
        }
      }
    });
  }
  clearCart() {
    let cartItems = cart.map((item) => item.id); //pobieramy id
    cartItems.forEach((id) => this.removeItem(id));
    while (cartContent.children.length > 0) {
      cartContent.removeChild(cartContent.children[0]);
    }
  }
  removeItem(id) {
    cart = cart.filter((item) => item.id !== id);
    this.setCartValues(cart);
    Storage.saveCart(cart);
    let button = this.getSingleButton(id);
    button.disabled = false;
    button.innerHTML = `<i class="fas fa-shopping-cart">add to cart</i>`;
  }
  getSingleButton(id) {
    return buttonsDOM.find((button) => button.dataset.id === id);
  }
}

//LOCAL STORAGE, przechowuje dane w koszyku po odswiezeniu strony
class Storage {
  static saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }
  static getProduct(id) {
    let products = JSON.parse(localStorage.getItem("products"));
    return products.find((product) => product.id === id);
  }
  static saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  static getCart() {
    return localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  const products = new Products();
  const meat = new Meat();
  //SETUP APP
  ui.setupAPP();
  //GET ALL PRODUCTS
  products
    .getProducts()
    .then((products) => {
      ui.displayProducts(products);
      Storage.saveProducts(products);
    })
    .then(() => {
      ui.getBagButtons();
      ui.cartLogic();
    });
  meat.getMeat().then((meat) => {
    ui.displayMeat(meat);
  });
});
