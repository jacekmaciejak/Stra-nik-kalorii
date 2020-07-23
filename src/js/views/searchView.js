import { elements } from "./base";

export const getInput = () => elements.searchInput.value;
export const clearInput = () => {
  elements.searchInput.value = "";
};
export const clearResults = () => {
  elements.searchResultList.innerHTML = "";
};

const renderRecipe = (recipe) => {
  const markup = `
<articel class="product">
    <a href="#${recipe.recipe_id}" class="results__link">
    <figure class="results__fig img__container">
        <img class="product__img" src="${recipe.image_url}" alt="${recipe.title}"/>
    </figure>
    <div class="results">
        <h4 class="results__name">${recipe.title}</h4>
        <p class="results__author">${recipe.publisher}</p>
    </div>
    </a>
</articel>
`;
  elements.searchResultList.insertAdjacentHTML("beforeend", markup);
};

export const renderResults = (recipes) => {
  recipes.forEach(renderRecipe);
};
