export const elements = {
  searchForm: document.querySelector(".search"),
  searchInput: document.querySelector(".search__field"),
  searchResultContainer: document.querySelector(".products"),
  searchResultList: document.querySelector(".products__list"),
  searchResultButtons: document.querySelector(".products__buttons"),
  recipe: document.querySelector(".recipe"),
  cartContent: document.querySelector(".cart__content"),
};

export const elementStrings = {
  loader: "loader",
};

export const renderLoader = (parent) => {
  const loader = `
    <div class="${elementStrings.loader}">
      <svg>
        <use href="images/icons.svg#icon-cw"></use>
      </svg>
    </div>
`;
  parent.insertAdjacentHTML("afterbegin", loader);
};
export const clearLoader = () => {
  const loader = document.querySelector(`.${elementStrings.loader}`);
  if (loader) loader.parentElement.removeChild(loader);
};
