import "./main.scss";
import Search from "./js/models/Search";
import Recipe from "./js/models/Recipe";
import List from "./js/models/List";
import Likes from "./js/models/Likes";
import * as searchView from "./js/views/searchView";
import * as recipeView from "./js/views/recipeView";
import * as listView from "./js/views/listView";
import * as likesView from "./js/views/likesView";
import * as list from "./js/models/List";
import { elements, renderLoader, clearLoader } from "./js/views/base";

const state = {};
window.state = state;

/**
 ************************************
 ************************************
 *********SEARCH CONTROLLER**********
 ************************************
 ************************************
 */

const controlSearch = async () => {
  //1)get query from the view
  const query = searchView.getInput();
  // const query = "pizza";

  if (query) {
    //2) New search object and add to state
    state.search = new Search(query);
    //3)Prepare UI for results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchResultContainer);

    try {
      //4) Search for recipes
      await state.search.getResults();

      // 5) Render results on UI
      clearLoader();
      searchView.renderResults(state.search.result);
    } catch (err) {
      alert("Sometching wrong with the search...");
      clearLoader();
    }
  }
};

elements.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  controlSearch();
});

//-----------------------
//TESTING
//---------------------
// window.addEventListener("load", (e) => {
//   e.preventDefault();
//   controlSearch();
// });

elements.searchResultButtons.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn-inline");
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto);
    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage);
  }
});

/**
 ********************************
 ********************************
 *******RECIPE CONTROLLER********
 ********************************
 ********************************
 */

const controlRecipe = async () => {
  //Get ID from url
  const id = window.location.hash.replace("#", "");

  if (id) {
    //Prepare UI for changes
    recipeView.clearRecipe();
    renderLoader(elements.recipe);

    //Highlight selected search item
    if (state.search) searchView.highlightSelected(id);
    //Create new recipe object
    state.recipe = new Recipe(id);

    // //TESTING
    // window.r = state.recipe;

    try {
      //Get recipe data and parse ingredients
      await state.recipe.getRecipe();
      state.recipe.parseIngredients();
      //Calculate servings and time
      state.recipe.calcTime();
      state.recipe.calcServings();
      //Render recipe
      clearLoader();
      recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));
    } catch (err) {
      console.log(err);

      alert("Error processing recipe!");
    }
  }
};

["hashchange", "load"].forEach((e) =>
  window.addEventListener(e, controlRecipe)
);
// window.addEventListener("hashchange", controlRecipe);
// window.addEventListener("load", controlRecipe);

/****************************************
 ****************************************
 *************CART CONTROLLER************
 ****************************************
 ****************************************
 */

const controlList = () => {
  //Create a new list if there is none yet
  if (!state.list) state.list = new List();
  //Add each ingredient to the list and UI
  state.recipe.ingredients.forEach((el) => {
    const item = state.list.addItem(el.count, el.unit, el.ingredient);
    listView.renderItem(item);
  });
};
//Show list of products
elements.cartBtn.addEventListener("click", list.showCart);

//Hide list of products
elements.closeCartBtn.addEventListener("click", list.hideCart);

//Handle delete and update list item events
elements.cartContent.addEventListener("click", (e) => {
  const id = e.target.closest(".shopping__item").dataset.itemid;
  console.log(id);

  //Handle the delete button
  if (e.target.matches(".shopping__delete, .shopping__delete *")) {
    //Delete from state
    state.list.deleteItem(id);
    //Delete from UI
    listView.deleteItem(id);
    //Handle the count update
  } else if (e.target.matches(".shopping__count-value")) {
    const val = parseFloat(e.target.value, 10);
    state.list.updateCount(id, val);
  }
});

/****************************************
 ****************************************
 *************LIKE CONTROLLER************
 ****************************************
 ****************************************
 */
//TESTING
state.likes = new Likes();
likesView.toggleLikeMenu(state.likes.getNumLikes());

const controlLike = () => {
  if (!state.likes) state.likes = new Likes();

  const currentID = state.recipe.id;
  //User has NOT yet liked current recipe
  if (!state.likes.isLiked(currentID)) {
    //Add like to the state
    const newLike = state.likes.addLike(
      currentID,
      state.recipe.title,
      state.recipe.author,
      state.recipe.img
    );

    //Toggle the like button
    likesView.toggleLikeBtn(true);
    //Add like to UI list
    likesView.renderLike(newLike);

    //User HAS yet liked current recipe
  } else {
    //Remove like from the state
    state.likes.deleteLike(currentID);
    //Toggle the like button
    likesView.toggleLikeBtn(false);

    //Remove like from UI list
    likesView.deleteLike(currentID);
  }
  likesView.toggleLikeMenu(state.likes.getNumLikes());
};

//Handling recipe button clicks
elements.recipe.addEventListener("click", (e) => {
  if (e.target.matches(".btn-decrease,.btn-decrease *")) {
    //Decrease button is clicked
    if (state.recipe.servings > 1) {
      state.recipe.updateServings("dec");
      recipeView.updateServingsIngredients(state.recipe);
    }
  } else if (e.target.matches(".btn-increase,.btn-increase *")) {
    //Increase button is clicked
    state.recipe.updateServings("inc");
    recipeView.updateServingsIngredients(state.recipe);
  } else if (e.target.matches(".recipe__btn--add,.recipe__btn--add *")) {
    //Add ingredients to shopping list
    controlList();
  } else if (e.target.matches(".recipe__love,.recipe__love *")) {
    //Like controller
    controlLike();
  }
});

window.l = new List();

// const search = new Search("pizza");
// console.log(search);

/****************************************
 ****************************************
 *************BUBBLY BUTTON************
 ****************************************
 ****************************************
 */
const animateButton = function (e) {
  e.preventDefault;
  //reset animation
  e.target.classList.remove("animate");

  e.target.classList.add("animate");
  setTimeout(function () {
    e.target.classList.remove("animate");
  }, 700);
};

const bubblyButtons = document.getElementsByClassName("bubbly-button");

for (var i = 0; i < bubblyButtons.length; i++) {
  bubblyButtons[i].addEventListener("click", animateButton, false);
}

//---------------------------------
//---------------------------------
//---------------------------------
//---------------------------------
//---------------------------------
//---------------------------------
//---------------------------------
//---------------------------------
//---------------------------------
//---------------------------------
//---------------------------------

// const cartBtn = document.querySelector(".cart__btn");
// const closeCartBtn = document.querySelector(".cart__close");
// const cartDOM = document.querySelector(".cart__wrapper");
// const cartOverlay = document.querySelector(".cart");
// const clearCartBtn = document.querySelector(".clear__cart");
const cartItems = document.querySelector(".cart__items");
const cartTotal = document.querySelector(".cart__total");
const cartContent = document.querySelector(".cart__content");
const productsDOM = document.querySelector(".products__center");
const headerBannerDOM = document.querySelector(".banner");
//CART
let cart = [];
//List of products
let mainProducts = [];
//buttons
let buttonsDOM = [];

//GETTING THE PRODUCTS
class listOfProducts {
  async getListOfProducts() {
    try {
      let result = await fetch("groupofproducts.json");
      let data = await result.json();
      let products = data.items;
      products = products.map((item) => {
        const { title } = item.fields;
        const { id } = item.sys;
        const image = item.fields.image.fields.file.url;
        return { title, id, image };
      });
      return products;
    } catch (error) {
      console.log(error);
    }
  }
}

//DISPLAY ALL MEALS
class UI {
  displayListOfProducts(products) {
    let result = "";
    products.forEach((product) => {
      result += `
            <article class="product mainProduct" data-id=${product.id}>
                <div class="img__container">
                    <img src=${product.image} alt="product image" class="product__img">
                </div>
                <h3>${product.title}</h3>
            </article>
        `;
    });
    headerBannerDOM.innerHTML = result;
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
                    </div>
                    <div>
                        <i class="fas fa-chevron-up" data-id=${item.id}></i>
                        <p class="item-amount">${item.amount}</p>
                        <i class="fas fa-chevron-down" data-id=${item.id}></i>
                    </div>`;
    cartContent.appendChild(div);
  }
  // showCart() {
  //   cartOverlay.classList.add("transparentBcg");
  //   cartDOM.classList.add("showCart");
  // }
  setupAPP() {
    cart = Storage.getCart();
    this.setCartValues(cart);
    this.populateCart(cart);
    // cartBtn.addEventListener("click", this.showCart);
    // closeCartBtn.addEventListener("click", this.hideCart);
  }
  populateCart(cart) {
    cart.forEach((item) => this.addCartItem(item));
  }
  // hideCart() {
  //   cartOverlay.classList.remove("transparentBcg");
  //   cartDOM.classList.remove("showCart");
  // }
  cartLogic() {
    //clear cart button
    clearCartBtn.addEventListener("click", () => {
      this.clearCart();
    });
    //cart functionality
    cartContent.addEventListener("click", (event) => {
      if (event.target.classList.contains("remove__item")) {
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
    button.innerHTML = `<i class="fas fa__shopping-cart">add to cart</i>`;
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
  static saveMeat(meat) {
    localStorage.setItem("meat", JSON.stringify(meat));
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
//wywolanie funkcji przy ładowaniu strony
document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  const listofproducts = new listOfProducts();
  // const products = new Products();
  // const meat = new Meat();
  //SETUP APP
  ui.setupAPP();
  //GET ALL PRODUCTS
  listofproducts.getListOfProducts().then((products) => {
    ui.displayListOfProducts(products);
  });
});
