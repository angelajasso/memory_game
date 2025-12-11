// 1. Rutas de las imágenes
const cardsData = [
  "assets/nota1.png",
  "assets/nota1.png",
  "assets/nota2.png",
  "assets/nota2.png",
];

// 2. Mezclar el array
cardsData.sort(() => Math.random() - 0.5);

const board = document.getElementById("board");
let firstCard = null;
let secondCard = null;
let lockBoard = false;

// 3. Crear cartas dinámicamente
cardsData.forEach((imgPath) => {
  const card = document.createElement("div");
  card.classList.add("card");

  // Cara trasera
  const back = document.createElement("div");
  back.classList.add("card-face", "card-back");
  back.textContent = "?";

  // Cara frontal (con imagen)
  const front = document.createElement("div");
  front.classList.add("card-face", "card-front");
  front.innerHTML = `<img src="${imgPath}" alt="imagen-memoria">`;

  card.append(back, front);
  board.appendChild(card);

  card.addEventListener("click", () => flipCard(card, imgPath));
});

// 4. Acción al voltear cartas
function flipCard(card, imgPath) {
  if (lockBoard) return;
  if (card === firstCard) return;

  card.classList.add("flip");

  if (!firstCard) {
    firstCard = { card, imgPath };
    return;
  }

  secondCard = { card, imgPath };
  lockBoard = true;

  checkMatch();
}

// 5. Verificar si hay coincidencia
function checkMatch() {
  if (firstCard.imgPath === secondCard.imgPath) {
    disableCards();
  } else {
    unflipCards();
  }
}

// 6. Si coinciden
function disableCards() {
  firstCard.card.style.pointerEvents = "none";
  secondCard.card.style.pointerEvents = "none";
  resetTurn();
}

// 7. Si NO coinciden
function unflipCards() {
  setTimeout(() => {
    firstCard.card.classList.remove("flip");
    secondCard.card.classList.remove("flip");
    resetTurn();
  }, 900);
}

// 8. Reset de variables
function resetTurn() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}
