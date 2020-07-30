import { elements } from "./base";

export const getInput = () => elements.searchInput.value;
export const clearInput = () => {
  elements.searchInput.value = "";
};
export const clearResults = () => {
  elements.searchResultList.innerHTML = "";
  elements.searchResultButtons.innerHTML = "";
};

const limitRecipeTitle = (title, limit = 15) => {
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
                        <a href="#${recipe.recipe_id}" class="product__link">
                            <figure class="product__container">
                                <img class="product__img" src="${
                                  recipe.image_url
                                }" alt="${recipe.title}"/>
                            </figure>
                            <div class="product__text">
                                <h4>${limitRecipeTitle(recipe.title)}</h4>
                            </div>
                        </a>
                    </articel>`;
  elements.searchResultList.insertAdjacentHTML("beforeend", markup);
};

const createButton = (page, type) => `

               <button class="btn-inline results__btn--${type}" data-goto=${
  type === "prev" ? page - 1 : page + 1
}>
                  <span>Page ${type === "prev" ? page - 1 : page + 1}</span>

                    <svg class="search__icon">
                        <use href="images/icons.svg#icon-triangle-${
                          type === "prev" ? "left" : "right"
                        }"></use>
                    </svg>
                </button>

`;

const renderButtons = (page, numResults, resPerPage) => {
  const pages = Math.ceil(numResults / resPerPage);
  let button;

  if (page === 1 && pages > 1) {
    //only button to go to the next page
    // elements.searchResultPagesLeft.style.display = "none";
    button = createButton(page, "next");
  } else if (page < pages) {
    //Both buttons
    button = `${createButton(page, "prev")}${createButton(page, "next")}`;
  } else if (page === pages && pages > 1) {
    //  only button to go to the previous page
    button = createButton(page, "prev");
  }
  elements.searchResultButtons.insertAdjacentHTML("afterbegin", button);
};

export const renderResults = (recipes, page = 1, resPerPage = 9) => {
  const start = (page - 1) * resPerPage;
  const end = page * resPerPage;

  recipes.slice(start, end).forEach(renderRecipe);
  renderButtons(page, recipes.length, resPerPage);
};
