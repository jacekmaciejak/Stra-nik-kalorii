import { elements } from "./base";

export const displayListOfProducts = (products) => {
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
  elements.headerBannerDOM.innerHTML = result;
};
