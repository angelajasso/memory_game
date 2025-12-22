// 1. Referencias al DOM
const board = document.querySelector(".board");
const resetBtn = document.querySelector("#reset-btn");
const btn = document.getElementById("toggle-theme");
const body = document.body;

// ---Modo Dark/light
// --- Cargar preferencia guardada o usar la del sistema ---
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
  body.classList.add("dark");
  btn.textContent = "☀️";
} else {
  body.classList.remove("dark");
  btn.textContent = "🌙";
}

// --- Función para alternar modo y guardar preferencia ---
function toggleTheme() {
  const isDark = body.classList.toggle("dark");
  const icon = isDark ? "☀️" : "🌙";

  btn.textContent = icon;

  // Guardar modo actual
  localStorage.setItem("theme", isDark ? "dark" : "light");
}

// --- Asignar eventos a ambos botones ---
btn.addEventListener("click", toggleTheme);

function toggleMenu() {
  document.getElementById("menu").classList.toggle("show");
}

// 2. Estado del juego
let firstCard = null;
let secondCard = null;
let lockBoard = false;

// 3. Valores de las cartas
const cardValues = [
  "assets/nota1.png",
  "assets/nota1.png",
  "assets/nota2.png",
  "assets/nota2.png",
  "assets/nota3.png",
  "assets/nota3.png",
  "assets/nota4.png",
  "assets/nota4.png",
  "assets/nota5.png",
  "assets/nota5.png",
  "assets/nota6.png",
  "assets/nota6.png",
];

// 4. Barajar cartas
cardValues.sort(() => 0.5 - Math.random());

// 5. Crear cartas
function createCards() {
  cardValues.forEach((value) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.value = value;

    const front = document.createElement("div");
    front.classList.add("front");

    const img = document.createElement("img");
    img.src = value;
    img.alt = "card image";
    front.appendChild(img);

    const back = document.createElement("div");
    back.classList.add("back");
    back.textContent = "?";

    card.append(front, back);
    board.appendChild(card);

    card.addEventListener("click", () => flipCard(card));
  });
}

// 6.Voltear la carta
function flipCard(card) {
  if (lockBoard) return;
  if (card === firstCard) return;
  if (card.classList.contains("matched")) return; // 👈 clave

  card.classList.add("flipped");

  if (!firstCard) {
    firstCard = card;
    return;
  }

  secondCard = card;
  checkForMatch();
}

// 7.Comparar cartas
function checkForMatch() {
  const isMatch = firstCard.dataset.value === secondCard.dataset.value;

  isMatch ? disableCards() : unflipCards();
}

// 8.Match
function disableCards() {
  firstCard.classList.add("matched");
  secondCard.classList.add("matched");

  checkWin(); // 👈 aquí se revisa victoria
  resetBoard();
}

function checkWin() {
  const matchedCards = document.querySelectorAll(".card.matched");
  const totalCards = board.children.length;

  if (matchedCards.length === totalCards) {
    setTimeout(() => {
      alert("¡Ganaste! 🎉");
      resetGame();
    }, 800);
  }
}

// 9.No match
function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    resetBoard();
  }, 1000);
}

// 10. Reset de turno
function resetBoard() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

// 11. Reiniciar juego
function resetGame() {
  // Resetear estado
  firstCard = null;
  secondCard = null;
  lockBoard = false;

  // Limpiar tablero
  board.innerHTML = "";

  // Barajar de nuevo
  cardValues.sort(() => 0.5 - Math.random());

  // Crear cartas otra vez
  createCards();
}

// 12.Eventos iniciales
resetBtn.addEventListener("click", resetGame);

// Crear juego al cargar
createCards();

// --- Actualizar el año automáticamente ---
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}
