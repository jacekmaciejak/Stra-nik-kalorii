import { elements } from "./base";
import { limitRecipeTitle } from "./searchView";

// export const renderItemTitle = (item) => {
//   const markup = `
//                 <div class="shopping__title data-itemid=${item.id}>
//                             <figure class="product__container">
//                                 <img class="product__img" src="${
//                                   item.image_url
//                                 }" alt="${item.title}"/>
//                             </figure>
//                             <div class="product__text">
//                                 <h4>${limitRecipeTitle(item.title)}</h4>
//                             </div>
//                 </div>
// `;
//     elements.cartContent.insertAdjacentHTML("afterbegin", markup);
// };

export const renderItem = (item) => {
  const markup = `
                <li class="shopping__item" data-itemid=${item.id}>
                    <div class="shopping__count">
                        <i class="fas fa-chevron-up" data-id=${item.id}></i>
                        <input type="number" value="${item.count}" step="${item.count}" class="shopping__count-value">
                        <p>${item.unit}</p>
                        <i class="fas fa-chevron-down" data-id=${item.id}></i>

                    </div>
                    <p class="shopping__description">${item.ingredient}</p>
                    <button class="shopping__delete btn-tiny ">
                        <svg>
                            <use href="images/icons.svg#icon-circle-with-cross"></use>
                        </svg>
                    </button>
                </li>

`;
  elements.cartContent.insertAdjacentHTML("beforeend", markup);
};

export const deleteItem = (id) => {
  const item = document.querySelector(`[data-itemid="${id}"]`);
  if (item) item.parentElement.removeChild(item);
};

export const deleteAllItems = () => {
  elements.cartContent.innerHTML = "";
};



// export const clearCart = () => {
//   let cartItems = cart.map((item) => item.id); //pobieramy id
//   cartItems.forEach((id) => this.removeItem(id));
//   while (cartContent.children.length > 0) {
//     cartContent.removeChild(cartContent.children[0]);
//   }
// };

/* <img src= ${item.image} alt="product" >
    <div>
        <h4>${item.title}</h4>
        <span class="remove__item" data-id=${item.id}>remove</span>
    </div>
    <li class="shopping__item data-itemid=${item.id}">
        <div class="shopping__count">
            <input type="number" value="${item.count}" step="${item.count}" class="shopping__count-value">
                <p>${item.unit}</p>
                    </div>
            <p class="shopping__description">${item.ingredient}</p>
            <button class="shopping__delete btn-tiny">
                <svg>
                    <use href="images/icons.svg#icon-circle-with-cross"></use>
                </svg>
            </button>
                </li>
        <div>
            <i class="fas fa-chevron-up" data-id=${item.id}></i>
            <p class="item-amount">${item.amount}</p>
            <i class="fas fa-chevron-down" data-id=${item.id}></i>
        </div> */
