const colorToGuess = document.getElementById('rgb-color');
const arrayBalls = document.getElementsByClassName('ball');
const wonOrLostMessage = document.getElementById('answer');
const resetColorsButton = document.getElementById('reset-game');
const scoreElement = document.getElementById('score');

let score = 0;
scoreElement.textContent = score;

function generateRandomNumber() {
  return Math.floor(Math.random() * 256);
}

function generateRandomColor() {
  const red = generateRandomNumber();
  const green = generateRandomNumber();
  const blue = generateRandomNumber();
  return `rgb(${red}, ${green}, ${blue})`;
}

function generateDifferentColor() {
  let randomColor = generateRandomColor();
  while (randomColor.toLowerCase() === colorToGuess.textContent.toLowerCase()) {
    randomColor = generateRandomColor();
  }
  return randomColor;
}

function fillBalls() {
  const rightBall = Math.floor(Math.random() * 6);
  for (let i = 0; i < arrayBalls.length; i += 1) {
    if (i === rightBall) {
      arrayBalls[i].style.backgroundColor = colorToGuess.textContent.toLowerCase();
    } else {
      arrayBalls[i].style.backgroundColor = generateDifferentColor();
    }
  }
}

function chooseColor(event) {
  const selectedBall = event.target;
  
  // Evita interazioni se l'utente ha già indovinato
  if (wonOrLostMessage.textContent === 'That\'s right!') {
    return;
  } 
  
  if (selectedBall.style.backgroundColor === colorToGuess.textContent.toLowerCase()) {
    wonOrLostMessage.textContent = 'That\'s right!';
    wonOrLostMessage.style.color = '#10b981'; // Verde minimale
    score += 3;
    scoreElement.textContent = score;
  } else {
    wonOrLostMessage.textContent = 'Wrong! Try again!';
    wonOrLostMessage.style.color = '#ef4444'; // Rosso minimale
  }
}

function addEventListenerToBalls() {
  for (let i = 0; i < arrayBalls.length; i += 1) {
    arrayBalls[i].addEventListener('click', chooseColor);
  }
}

function onLoadPage() {
  colorToGuess.textContent = generateRandomColor().toUpperCase();
  wonOrLostMessage.style.color = '#1a1a1a'; // Torna al colore neutro
  addEventListenerToBalls();
  fillBalls();
  wonOrLostMessage.textContent = 'Pick the right color';
}

resetColorsButton.addEventListener('click', onLoadPage);

window.onload = onLoadPage;