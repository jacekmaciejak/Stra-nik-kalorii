export const elements = {
  searchForm: document.querySelector(".search"),
  searchInput: document.querySelector(".search__field"),
  searchResultList: document.querySelector(".products__list"),
  searchResultPagesLeft: document.querySelector(".products__button-left"),
  searchResultPagesRight: document.querySelector(".products__button-right"),
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
