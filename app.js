const cartBtn = document.querySelector(".cart-btn");
const closeCartBtn = document.querySelector(".close-cart");
const clearCartBtn = document.querySelector(".clear-cart");
const cartDOM = document.querySelector(".cart");
const cartOverlay = document.querySelector(".cart-overlay");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-contant");
const productsDOM = document.querySelector(".products-center");
//CART
let cart = [];

//GETTING THE PRODUCTS
class Products {
  async getProducts() {
    try {
      let result = await fetch("products.json");
      let data = await result.json();
      let products = data.items;
      products = products.map(item => {
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

//DISPLAY PRODUCTS

class UI {
  displayProducts(products) {
    let result = "";
    products.forEach(product => {
      result += `
            <article class="product">
                <div class="img-container">
                    <img src=${product.image} alt="product" class="product-img">
                    <button class="bag-btn" data-id=${product.id}>
                        <i class="fas fa-shopping-cart"></i>
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
}

//LOCAL STORAGE
class Storage {}
document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  const products = new Products();

  //GET ALL PRODUCTS
  products.getProducts().then(products => ui.displayProducts(products));
});
