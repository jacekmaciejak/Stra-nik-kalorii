const meats = [
  { name: "cielecina", calories: 2000 },
  { name: "jagniecina", calories: 3000 },
  { name: "kurczak", calories: 1000 },
  { name: "wieprzowina", calories: 4000 }
];

const vegetables = [
  { name: "ogorek", calories: 100 },
  { name: "pomidor", calories: 200 },
  { name: "dynia", calories: 300 },
  { name: "papryka", calories: 400 },
  { name: "czosnek", calories: 500 }
];
const fruits = [
  { name: "truskawki", calories: 100 },
  { name: "winogrona", calories: 200 },
  { name: "banan", calories: 300 },
  { name: "porzeczki", calories: 400 },
  { name: "pomarancze", calories: 500 }
];
const additions = [
  { name: "kasza", calories: 100 },
  { name: "ketchup", calories: 200 },
  { name: "musztarda", calories: 300 },
  { name: "chrzan", calories: 400 },
  { name: "majonez", calories: 500 }
];
const drinks = [
  { name: "woda", calories: 100 },
  { name: "sok naturalny", calories: 200 },
  { name: "napoj gazowany", calories: 300 },
  { name: "kawa", calories: 400 },
  { name: "herbata", calories: 500 }
];

let orderElement = 1;
const btnMeat = document.querySelector("button.meat");
const btnVegetable = document.querySelector("button.vegetables");
const btnFruits = document.querySelector("button.fruits");
const btnAdditions = document.querySelector("button.additions");
const btnDrinks = document.querySelector("button.drinks");
const panel = document.querySelector("panel_4");
const meatNames = Array.from(meats, ({ name }) => name);
const meatCalories = Array.from(meats, ({ calories }) => calories);
const vegetablesNames = Array.from(vegetables, ({ name }) => name);
const fruitsNames = Array.from(fruits, ({ name }) => name);
const additionsNames = Array.from(additions, ({ name }) => name);
const drinksNames = Array.from(drinks, ({ name }) => name);
const li = document.createElement("li");

const init = () => {
  const ul = document.createElement("ul");
  ul.style.listStyle = "none";
  btnMeat.addEventListener("click", showMeat);
  btnVegetable.addEventListener("click", showVegetables);
  btnFruits.addEventListener("click", showFruits);
  btnAdditions.addEventListener("click", showAdditions);
  btnDrinks.addEventListener("click", showDrinks);
};

const createLi = () => {
  li.className = "newli"; //dodajemy nowa klase do stworzonego "li"
  document.querySelector(".panel_4").appendChild(li);
};

const showMeat = () => {
  createLi();
  li.textContent = `${meatNames} : ${meatCalories}`;
};
const showVegetables = () => {
  createLi();
  li.textContent = `${vegetablesNames}`;
};
const showFruits = () => {
  createLi();
  li.textContent = `${fruitsNames}`;
};
const showAdditions = () => {
  createLi();
  li.textContent = `${additionsNames}`;
};
const showDrinks = () => {
  createLi();
  li.textContent = `${drinksNames}`;
};
// const clearPanel = () => {
//   panel.textContent = "";
// };
init();
