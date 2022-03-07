import {GameStats, Game} from './game.js';

const selectors = [
  '.result_msg',
  '.guess',
  '.guess_btn',
  '.reset_btn',
  '.secret_number',
  '.scores',
  '#result',
  '.loading',
  '.current_score h3',
  '.high_score h3',
];
const elements = selectors.map((selector) => document.querySelector(selector));
const [
  resultMsg,
  guess,
  guessBtn,
  resetBtn,
  secretNumberElem,
  scoresElem,
  resultsElem,
  loading,
  currentScore,
  highScore,
] = elements;

const gameStats = new GameStats(
  JSON.parse(localStorage.getItem('scores')) || [],
  localStorage.getItem('currentPlayer') || 'anonymous',
);
const game = new Game();

function scoreboard() {
  const scores = gameStats.scores.map((myScore) => {
    const {playerName, score, date} = myScore;
    return `<tr><td>#${
      gameStats.scores.indexOf(myScore) + 1
    }</td><td>${playerName}</td><td>${score}</td><td>${date}</td></tr>`;
  });
  scoresElem.innerHTML = scores.join(' ');
}
function newGame() {
  secretNumberElem.innerHTML = '';
  currentScore.innerHTML = '000';
  resultsElem.removeAttribute('class');
  resultsElem.classList.add('material-icons-round', 'rotate', 'thinking');
  game.newGame();
  loading.innerHTML = 'Choosing a new number...';
  resultMsg.innerHTML = '';
  guess.value = '';
  setTimeout(() => {
    resultsElem.classList.remove('rotate', 'thinking');
    loading.innerHTML = 'The secret number is...';
  }, 2000);
}
function findHighScore() {
  highScore.innerHTML = gameStats.playerHighScore;
}
function checkGuess(guessedNumber) {
  resultsElem.removeAttribute('class');
  resultsElem.classList.add('material-icons-round', 'rotate');

  setTimeout(() => {
    game
      .play(guessedNumber)
      .then((score) => {
        resultMsg.innerHTML = `Congrats!`;
        resultsElem.classList.add('correct');
        secretNumberElem.innerHTML = guessedNumber;
        setTimeout(newGame, 3000);
        gameStats.updateScores = score;
        localStorage.setItem('scores', JSON.stringify(gameStats.scores));
      })
      .catch((error) => {
        resultMsg.innerHTML = error.message;
        resultsElem.classList.add(error.name);
        currentScore.innerHTML = error.score;
      })
      .finally(() => {
        resultsElem.classList.remove('rotate');
        findHighScore();
        scoreboard();
      });
  }, 750);
}

guessBtn.addEventListener('click', () => {
    checkGuess(guess.value);
});
resetBtn.addEventListener('click', () => {
  localStorage.removeItem('scores');
  gameStats.resetScores;
  scoresElem.innerHTML = '';
});
guess.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    guessBtn.click();
  }
});

scoreboard();
newGame();
findHighScore();
