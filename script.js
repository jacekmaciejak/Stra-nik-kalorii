const meal = [
  { name: "beef", calories: 2000 },
  { name: "lamb", calories: 3000 },
  { name: "chicken", calories: 1000 },
  { name: "pork", calories: 4000 }
];

let numberOfProducts = 10;
let orderElement = 1;
const btnMeat = document.querySelector("button.meat");

const init = () => {
  const ul = document.createElement("ul");
  ul.style.listStyle = "none";
  btnMeat.addEventListener("click", showMeat);
};

const showMeat = () => {
  for (let i = 0; i < 10; i++) {
    // document.querySelector(".panel_4").textContent = "";
    const li = document.createElement("li");
    li.textContent = `element nr  ${orderElement++}`;
    document.querySelector(".panel_4").appendChild(li);
  }
};
init();
