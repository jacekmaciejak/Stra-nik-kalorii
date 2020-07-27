import { elements } from "./base";

export const getInput = () => elements.searchInput.value;
export const clearInput = () => {
  elements.searchInput.value = "";
};
export const clearResults = () => {
  elements.searchResultList.innerHTML = "";
};

const limitRecipeTitle = (title, limit = 20) => {
  const newTitle = [];
  if (title.length > limit) {
    title.split(" ").reduce((acc, cur) => {
      if (acc + cur.length <= limit) {
        newTitle.push(cur);
      }
      return acc + cur.length;
    }, 0);
    return `${newTitle.join(" ")}...`;
  }
  return title;
};

const renderRecipe = (recipe) => {
  const markup = `
<articel class="product">
    <a href="#${recipe.recipe_id}" class="results__link">
    <figure class="results__fig img__container">
        <img class="product__img" src="${recipe.image_url}" alt="${
    recipe.title
  }"/>
    </figure>
    <div class="results">
        <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
        <p class="results__author">${recipe.publisher}</p>
    </div>
    </a>
</articel>
`;
  elements.searchResultList.insertAdjacentHTML("beforeend", markup);
};

const createButton = (page, type) => `

               <button class="btn-inline results__btn--${type}" data-goto=${
  type === "prev" ? page - 1 : page + 1
}>
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-${
                          type === "prev" ? "left" : "right"
                        }"></use>
                    </svg>
                    <span>Page ${type === "prev" ? page - 1 : page + 1}</span>
                </button>

`;

const renderButtons = (page, numResults, resPerPage) => {
  const pages = Math.ceil(numResults / resPerPage);
  let buttonLeft;
  let buttonRight;
  if (page === 1 && pages > 1) {
    //only button to go to the next page
    buttonRight = createButton(page, "next");
  } else if (page < pages) {
    //Both buttons
    buttonLeft = createButton(page, "prev");
    buttonRight = createButton(page, "next");
  } else if (page === pages && pages > 1) {
    //  only button to go to the previous page
    buttonLeft = createButton(page, "prev");
  }
  elements.searchResultPagesLeft.insertAdjacentHTML("afterbegin", buttonLeft);
  elements.searchResultPagesRight.insertAdjacentHTML("beforeend", buttonRight);
};

export const renderResults = (recipes, page = 2, resPerPage = 10) => {
  const start = (page - 1) * resPerPage;
  const end = page * resPerPage;

  recipes.slice(start, end).forEach(renderRecipe);
  renderButtons(page, recipes.length, resPerPage);
};
