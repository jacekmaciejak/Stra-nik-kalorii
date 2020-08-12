import { elements } from "./base";

export const renderItem = (item) => {
  const markup = `

            <img src = ${item.image} alt = "product" >
            <div>
                <h4>${item.title}</h4>
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
                <span class="remove__item" data-id=${item.id}>remove</span>
            </div>
            <div>
                <i class="fas fa-chevron-up" data-id=${item.id}></i>
                <p class="item-amount">${item.amount}</p>
                <i class="fas fa-chevron-down" data-id=${item.id}></i>
            </div>
`;
  elements.cartContent.insertAdjacentHTML("beforeend", markup);
};

export const deleteItem = (id) => {
  const item = document.querySelector(`[data-itemid="${id}"]`);
  item.parentElement.removeChild(item);
};
