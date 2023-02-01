// Dados iniciais
let square = {
  a1: "",
  a2: "",
  a3: "",

  b1: "",
  b2: "",
  b3: "",

  c1: "",
  c2: "",
  c3: "",
};

let player = "x" || "o";
let warning = "";
let playing = false;
let placarX = 0;
let placarO = 0;

reset();

// Eventos
document.querySelector(".reset").addEventListener("click", reset);
document.querySelector(".reset--placar").addEventListener("click", resetPlacar);

document.querySelectorAll(".item").forEach((item) => {
  item.addEventListener("click", itemClick);
});

// Funções
function itemClick(event) {
  let item = event.target.getAttribute("data-item");
  if (playing && square[item] === "") {
    square[item] = player;
    renderSquare();
    togglePlayer();
  }

  event.target.textContent === "x"
    ? event.target.classList.add("red")
    : event.target.classList.add("blue");
}

function resetPlacar() {
  let infoPlacarX = document.querySelector(".infoplacar--x");
  let infoPlacarO = document.querySelector(".infoplacar--o");
  placarX = 0;
  placarO = 0;
  infoPlacarX.innerHTML = `x: ${placarX}`;
  infoPlacarO.innerHTML = `o: ${placarO}`;
}

function reset() {
  warning = "";

  let random = Math.floor(Math.random() * 2);
  player = random === 0 ? "x" : "o";

  for (let i in square) {
    square[i] = "";
  }

  for (let i in square) {
    document.querySelector(`[data-item=${i}]`).style.color = "";
    square[i] = "";
  }

  document.querySelectorAll(".red").forEach((item) => {
    item.classList.remove("red");
  });

  document.querySelectorAll(".blue").forEach((item) => {
    item.classList.remove("blue");
  });

  playing = true;

  renderSquare();
  renderInfo();
}

function renderSquare() {
  for (let i in square) {
    let item = document.querySelector(`div[data-item=${i}]`);
    item.innerHTML = square[i];
  }

  checkGame();
}

function renderInfo() {
  document.querySelector(".vez").innerHTML = player;
  document.querySelector(".resultado").innerHTML = warning;
}

function togglePlayer() {
  player = player === "x" ? "o" : "x";
  renderInfo();
}

function checkGame() {
  if (checkWinnerFor("x")) {
    warning = 'O "x" venceu';
    playing = false;
    checkPlacar();
  } else if (checkWinnerFor("o")) {
    warning = 'O "o" venceu';
    playing = false;
    checkPlacar();
  } else if (isFull()) {
    warning = "Empate";
    playing = false;
  }
}

function checkWinnerFor(player) {
  let pos = [
    "a1,a2,a3",
    "b1,b2,b3",
    "c1,c2,c3",

    "a1,b1,c1",
    "a2,b2,c2",
    "a3,b3,c3",

    "a1,b2,c3",
    "a3,b2,c1",
  ];

  for (let w in pos) {
    let pArray = pos[w].split(",");
    let hasWon = pArray.every((option) => square[option] === player);
    if (hasWon) {
      for (let i of pArray) {
        document.querySelector(`[data-item=${i}]`).style.color = "#32CD32";
      }
      return true;
    }
  }
  return false;
}

function isFull() {
  for (let i in square) {
    if (square[i] === "") {
      return false;
    }
  }
  return true;
}

function checkPlacar() {
  let infoPlacarX = document.querySelector(".infoplacar--x");
  let infoPlacarO = document.querySelector(".infoplacar--o");
  if (checkWinnerFor("x")) {
    placarX++;
    infoPlacarX.innerHTML = "x: " + placarX;
  } else if (checkWinnerFor("o")) {
    placarO++;
    infoPlacarO.innerHTML = "o: " + placarO;
  }
}
