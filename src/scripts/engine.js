const state = {
  view: {
    squares: document.querySelectorAll(".square"), 
    timeleft: document.querySelector("#timeleft"),
    score: document.querySelector("#score")
  },
  values: {
    timeId: null,
    gameVelocity: 1000,
    timeRemaining: 60,
    score: 0
  }
};

function randomSquare() {
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy");
  });

  let randomNumber = Math.floor(Math.random() * state.view.squares.length);
  let randomSquare = state.view.squares[randomNumber]; 
  randomSquare.classList.add("enemy");

  randomSquare.addEventListener("click", () => {
    if (randomSquare.classList.contains("enemy")) {
      state.values.score++;
      state.view.score.textContent = state.values.score;
      randomSquare.classList.remove("enemy");
      playsound(); // Chama a função para tocar a música
    }
  });
}

function playsound() {
  let audio = new Audio("/src/musica/hit.m4a");
  audio.play();
}

function moveEnemy() {
  state.values.timeId = setInterval(randomSquare, state.values.gameVelocity);
}

function updateTimer() {
  state.values.timeRemaining--;
  state.view.timeleft.textContent = state.values.timeRemaining;

  if (state.values.timeRemaining <= 0) {
    clearInterval(state.values.timeId);
    alert('Game Over');
  }
}

function decreaseVelocity() {
  if (state.values.gameVelocity > 200) {
    state.values.gameVelocity -= 50;
    clearInterval(state.values.timeId);
    moveEnemy();
  }
}

function initialize() {
  randomSquare();
  moveEnemy();

  setInterval(updateTimer, 1000);
  setInterval(decreaseVelocity, 10000);
}

initialize();