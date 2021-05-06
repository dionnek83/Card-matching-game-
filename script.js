// =====================================  GAME START SECTION ========================================== //
const startPopup = document.getElementsByClassName("start-popup")[0];
const startButton = document.getElementsByClassName("start-game")[0]; //for start button
var selectedLevel, x;

startButton.addEventListener("click", startGame);

function startGame() {
  x = document.getElementById("Difficulty Level").selectedIndex;
  selectedLevel = document.getElementsByTagName("option")[x].value;
  startPopup.classList.add("hide-popup");
  gameMusic.play();
  totalClicks = 0;
  deck.innerHTML = "";
  countDown = startCountDown();

  timeForLevel(selectedLevel);

  timeRemaining = totalTime;
  resetBoard();

  switch (selectedLevel) {
    case "easy":
      easyLevel();
      break;

    case "medium":
      mediumLevel();
      break;

    case "hard":
      hardLevel();
    default:
      break;
  }
}

// =====================================  MUSIC AND SOUND SECTION ========================================== //
function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function () {
    this.sound.play();
    // this.sound.volume = 0.5;
  };
  this.stop = function () {
    this.sound.pause();
    this.sound.currentTime = 0; //so that the music can start from the beginning
  };
}
const soundCheckbox = document.getElementById("sound-checkbox");
let musicCheckbox = document.getElementById("music-checkbox");
const applyButton = document.getElementsByClassName("applyButton")[0];

const gameMusic = new sound("Puzzle-Game.mp3");
const flipSound = new sound("card-flip.mp3");
const gameOverSound = new sound("gameover.wav");
const matchFound = new sound("correct.mp3");
const wonGame = new sound("horray_fireworks.wav");

soundCheckbox.addEventListener("click", function () {
  if (soundCheckbox.checked == true) {
    flipSound.sound.volume = 0.5;
  } else {
    flipSound.sound.volume = 0.0;
  }
});
musicCheckbox.addEventListener("click", function () {
  if (musicCheckbox.checked == true) {
    gameMusic.play();
  } else {
    gameMusic.stop();
  }
});

function resetMusic() {
  //resets music and sound by turning everything back on
  if (musicCheckbox.checked != true) {
    musicCheckbox.checked = true;
    gameMusic.play();
  }

  if (soundCheckbox.checked != true) {
    soundCheckbox.checked = true;
    flipSound.sound.volume = 0.5;
  }
}

// =====================================  LEVEL OF DIFFICULTY  ========================================== //

function easyLevel() {
  arrays = [
    "GOAL 1",
    "GOAL 1",
    "GOAL 2",
    "GOAL 2",
    "GOAL 3",
    "GOAL 3",
    "GOAL 4",
    "GOAL 4",
    "GOAL 5",
    "GOAL 5",
  ];
  generate();
}

function mediumLevel() {
  arrays = [
    "GOAL 1",
    "GOAL 1",
    "GOAL 2",
    "GOAL 2",
    "GOAL 3",
    "GOAL 3",
    "GOAL 4",
    "GOAL 4",
    "GOAL 5",
    "GOAL 5",
    "GOAL 1",
    "GOAL 1",
    "GOAL 2",
    "GOAL 2",
    "GOAL 3",
    "GOAL 3",
    "GOAL 4",
    "GOAL 4",
    "GOAL 5",
    "GOAL 5",
  ];
  generate();
}

function hardLevel() {
  arrays = [
    "GOAL 1",
    "GOAL 1",
    "GOAL 2",
    "GOAL 2",
    "GOAL 3",
    "GOAL 3",
    "GOAL 4",
    "GOAL 4",
    "GOAL 5",
    "GOAL 5",
    "GOAL 1",
    "GOAL 1",
    "GOAL 2",
    "GOAL 2",
    "GOAL 3",
    "GOAL 3",
    "GOAL 4",
    "GOAL 4",
    "GOAL 5",
    "GOAL 5",
    "GOAL 1",
    "GOAL 1",
    "GOAL 2",
    "GOAL 2",
    "GOAL 3",
    "GOAL 3",
    "GOAL 4",
    "GOAL 4",
    "GOAL 5",
    "GOAL 5",
    "GOAL 1",
    "GOAL 1",
    "GOAL 2",
    "GOAL 2",
    "GOAL 3",
    "GOAL 3",
    "GOAL 4",
    "GOAL 4",
    "GOAL 5",
    "GOAL 5",
  ];
  generate();
}

// Game starts at easy difficulty
window.addEventListener("DOMContentLoaded", easyLevel);

// =========================================  CREATES CARDS ======================================================= //

function generate() {
  const deck = document.querySelector(".deck");
  shuffle(arrays);
  let fragment = document.createDocumentFragment();
  arrays.forEach((array) => {
    var cardContainer = document.createElement("div");
    cardContainer.className = "memory-card";
    cardContainer.setAttribute("data-framework", `${array}`);

    // FRONT OF CARD
    var img1 = document.createElement("img");
    var arrayValue = `${array}`;
    img1.src = `./Images/${arrayValue}.png`;
    img1.className = "front-face";

    // BACK OF CARD
    var img2 = document.createElement("img");
    img2.src = `./Images/BackOfCard.png`;
    img2.className = "back-face";
    cardContainer.append(img1);
    cardContainer.append(img2);
    cardContainer.addEventListener("click", flipCard);
    fragment.appendChild(cardContainer);
  });
  deck.appendChild(fragment);
}

// ===========================================  TIME  =========================================================== //
let timer = document.getElementById("time-remaining");
let moves = document.getElementById("moves");
let totalTime;
let countDown;

function timeForLevel(level) {
  switch (level) {
    case "easy":
      totalTime = 30;
      break;
    case "medium":
      totalTime = 70;
      break;
    case "hard":
      totalTime = 115;
      break;

    default:
      break;
  }
}

function startCountDown() {
  return setInterval(() => {
    timeRemaining--;
    timer.innerText = timeRemaining;
    if (timeRemaining === 0) {
      gameOver();
    }
  }, 1000);
}

// =======================================  RESTART  ===================================================== //

function restart() {
  // resets timer, moves & music
  let restartLevel = document.getElementById("restartLevel").selectedIndex;
  selectedLevel = document.getElementsByTagName("option")[restartLevel].value;
  clearInterval(countDown);
  totalClicks = 0;
  moves.innerText = totalClicks;
  timer.innerText = 0;
  timeForLevel(selectedLevel);
  timeRemaining = totalTime;
  timer.innerText = timeRemaining;
  deck.innerHTML = "";
  countDown = startCountDown();
  numOfMatches = 0;
  resetMusic();
  resetBoard();
  console.log(selectedLevel);

  switch (selectedLevel) {
    case "easy":
      easyLevel();
      break;

    case "medium":
      mediumLevel();
      break;

    case "hard":
      hardLevel();
    default:
      break;
  }
}

// ===================================== CARDS FUNCTIONALITY SECTION ===================================== //
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let numOfMatches = 0;
// Controls the turning of each card
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");
  flipSound.play();
  totalClicks++;
  moves.innerText = totalClicks;

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }
  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  if (firstCard.dataset.framework === secondCard.dataset.framework) {
    disableCards();
    matchFound.sound.volume = 0.2;
    numOfMatches++;
    console.log(numOfMatches);

    if (soundCheckbox.checked === true) {
      matchFound.play();
    }

    if (selectedLevel === "easy" && numOfMatches === 5) {
      win();
    } else if (selectedLevel === "medium" && numOfMatches === 10) {
      win();
    } else if (selectedLevel === "hard" && numOfMatches === 20) {
      win();
    }
  } else {
    unflipCards();
  }
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

const shuffle = () => {
  let currentIndex = arrays.length,
    temporaryValue,
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = arrays[currentIndex];
    arrays[currentIndex] = arrays[randomIndex];
    arrays[randomIndex] = temporaryValue;
  }
  return arrays;
};

// ============================================ SETTINGS POPUP ================================================ //

const settingsButton = document.getElementById("settings");
const closeButton = document.getElementById("close-icon");
const settings = document.getElementsByClassName("settings")[0];
const help = document.getElementsByClassName("help")[0];
const helpCloseButton = document.getElementById("close-icon-help");

settingsButton.addEventListener("click", function () {
  settings.classList.remove("hide-popup");
});

closeButton.addEventListener("click", function () {
  settings.classList.add("hide-popup");
});
// ============================================ HELP POPUP ================================================ //
const helpButtton = document.getElementsByClassName("helpButton")[0];

//displays the popup
helpButtton.addEventListener("click", function () {
  help.classList.remove("hide-popup");
});

//removes the popup
helpCloseButton.addEventListener("click", function () {
  help.classList.add("hide-popup");
});

// ============================================ RESTART POPUP ================================================ //
const restartButton = document.getElementById("restart-icon");
const restartContainer = document.getElementsByClassName("restart")[0];
const restartCloseButton = document.getElementById("close-icon-restart");
const restartGameButton = document.getElementsByClassName("restart-game")[0];
const restartGame = document.getElementsByClassName("restart-game");

//displays the popup
restartButton.addEventListener("click", function () {
  restartContainer.classList.remove("hide-popup");
});

//removes the popup
restartCloseButton.addEventListener("click", function () {
  restartContainer.classList.add("hide-popup");
});

//restart game functionality
const deck = document.querySelector(".deck");
restartGameButton.addEventListener("click", function () {
  restartContainer.classList.add("hide-popup");
  restart();
});

// ===================================== LOST GAME SECTION ===================================== //

const timeOver = document.getElementsByClassName("time-over")[0];

function gameOver() {
  clearInterval(countDown);
  gameMusic.stop();
  if (soundCheckbox.checked === true) {
    gameOverSound.play();
  }

  timeOver.classList.remove("hide-popup");
}

const replayButton = document.getElementsByClassName("replay")[0];

replayButton.addEventListener("click", function () {
  timeOver.classList.add("hide-popup");
  startPopup.classList.remove("hide-popup");
  numOfMatches = 0;
  totalClicks = 0;
  moves.innerText = totalClicks;
  timeRemaining = totalTime;
  timer.innerText = timeRemaining;

  resetMusic();
});

// ===================================== WON GAME SECTION ===================================== //

const winScreen = document.getElementsByClassName("won-popup")[0];
const timeShow = document.getElementsByClassName("time-show")[0];
const playAgain = document.getElementsByClassName("play-again")[0];

function win() {
  clearInterval(countDown);
  gameMusic.stop();
  wonGame.sound.volume = 0.3;
  if (soundCheckbox.checked === true) {
    wonGame.play();
  }

  winScreen.classList.remove("hide-popup");
  let finishedTime = totalTime - timeRemaining;
  timeShow.innerHTML = finishedTime;
}

playAgain.addEventListener("click", function () {
  winScreen.classList.add("hide-popup");
  startPopup.classList.remove("hide-popup");
  numOfMatches = 0;
  totalClicks = 0;
  moves.innerText = totalClicks;
  timeRemaining = totalTime;
  timer.innerText = timeRemaining;
  resetMusic();
});
