import { elements } from "./base";
import { Fraction } from "fractional";

export const clearRecipe = () => {
  elements.recipe.innerHTML = "";
};

const formatCount = (count) => {
  if (count) {
    //2.5 --> 2 1/2
    //0.5 --> 1/2
    const [int, dec] = count
      .toString()
      .split(".")
      .map((el) => parseInt(el, 10));
    if (!dec) return count;

    if (int === 0) {
      const fr = new Fraction(count);
      return `${fr.numerator}/${fr.denominator}`;
    } else {
      const fr = new Fraction(count - int);
      return `${int} ${fr.numerator}/${fr.denominator}`;
    }
  }
  return "?";
};

const createIngredient = (ingredient) => `
                    <li class="recipe__item">
                        <svg class="recipe__icon">
                            <use href="images/icons.svg#icon-check"></use>
                        </svg>
                        <div class="recipe__count">${formatCount(
                          ingredient.count
                        )}</div>
                        <div class="recipe__ingredient">
                            <span class="recipe__unit">${ingredient.unit}</span>
                            ${ingredient.ingredient}
                        </div>
                    </li>
`;

export const renderRecipe = (recipe) => {
  const markup = `
          <figure class="recipe__fig">
                <img src="${recipe.img}" alt="${
    recipe.title
  }" class="recipe__fig-img">
                <h1 class="recipe__fig-title">
                    <span>${recipe.title}</span>
                </h1>
            </figure>
            <div class="recipe__details">
                <div class="recipe__details-info">
                    <svg class="recipe__info-icon">
                        <use href="images/icons.svg#icon-stopwatch"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--minutes">${
                      recipe.time
                    }</span>
                    <span class="recipe__info-text"> minutes</span>
                </div>
                <div class="recipe__details-info">
                    <svg class="recipe__info-icon">
                        <use href="images/icons.svg#icon-man"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--people">${
                      recipe.servings
                    }</span>
                    <span class="recipe__info-text"> servings</span>

                    <div class="recipe__info-buttons">
                        <button class="btn-tiny btn-decrease">
                            <svg>
                                <use href="images/icons.svg#icon-circle-with-minus"></use>
                            </svg>
                        </button>
                        <button class="btn-tiny btn-increase">
                            <svg>
                                <use href="images/icons.svg#icon-circle-with-plus"></use>
                            </svg>
                        </button>
                    </div>

                </div>
                <button class="recipe__details-love">
                    <svg class="header__likes">
                        <use href="images/icons.svg#icon-heart-outlined"></use>
                    </svg>
                </button>
            </div>

            <div class="recipe__ingredients">
                <ul class="recipe__ingredients-list">
                ${recipe.ingredients.map((el) => createIngredient(el)).join("")}
                </ul>
                <div class="recipe__ingredients-buttons">
                                <button class="btn-small recipe__btn recipe__btn--add">
                                    <svg class="search__icon">
                                        <use href="images/icons.svg#icon-shopping-cart"></use>
                                    </svg>
                                    <span>Add to shopping list</span>
                                </button>
                                <a class="btn-small recipe__btn" href="${
                                  recipe.url
                                }" target="_blank">
                                    <span>Directions</span>
                                    <svg class="search__icon">
                                        <use href="images/icons.svg#icon-triangle-right"></use>
                                    </svg>

                                </a>
                </div>
            </div>
`;
  elements.recipe.insertAdjacentHTML("afterbegin", markup);
};

export const updateServingsIngredients = (recipe) => {
  //Update servings
  document.querySelector(".recipe__info-data--people").textContent =
    recipe.servings;
  //Update ingredients
  const countElements = Array.from(document.querySelectorAll(".recipe__count"));

  countElements.forEach((el, i) => {
    el.textContent = formatCount(recipe.ingredients[i].count);
  });
};