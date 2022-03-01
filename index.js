let secretNumber;
const resultMsg = document.querySelector('.result_msg');
const guess = document.querySelector('.guess');
const guessBtn = document.querySelector('.guess_btn');
const resetBtn = document.querySelector('.reset_btn');
const newGameMsg = document.querySelector('.new_game_msg');
let scores = [];
const secretNumberElem = document.querySelector('.secret_number');
const scoresElem = document.querySelector('.scores');
const resultsElem = document.querySelector('#result');
const loading = document.querySelector('.loading');
const currentScore = document.querySelector('.current_score h3');
const highScore = document.querySelector('.high_score h3');
let player = '';

let gameScore;
let numTries;
let prevGuess;

function scoreboard() {
  scores.sort((a, b) => {
    a = parseInt(a.score);
    b = parseInt(b.score);
    return b - a;
  });
  scoresElem.innerHTML = '';
  for (const myScore of scores) {
    const row = document.createElement('tr');
    const num = document.createElement('td');
    const name = document.createElement('td');
    const score = document.createElement('td');
    const date = document.createElement('td');

    num.innerHTML = `#${scores.indexOf(myScore) + 1}`;
    name.innerHTML = myScore.playerName;
    score.innerHTML = myScore.score;
    date.innerHTML = myScore.date;
    row.appendChild(num);
    row.appendChild(name);
    row.appendChild(score);
    row.appendChild(date);
    scoresElem.appendChild(row);
  }
}

function newGame() {
  secretNumberElem.innerHTML = '';
  currentScore.innerHTML = '000';
  resultsElem.removeAttribute('class');
  resultsElem.classList.add('material-icons-round');
  resultsElem.classList.add('rotate');
  resultsElem.classList.add('thinking');
  scoreboard();
  gameScore = 1000;
  numTries = 0;
  prevGuess = 0;
  secretNumber = Math.ceil(Math.random() * 100);
  loading.innerHTML = 'Choosing a new number...';
  resultMsg.innerHTML = '';
  guess.value = '';
  setTimeout(() => {
    resultsElem.classList.remove('rotate');
    resultsElem.classList.remove('thinking');
    loading.innerHTML = 'The secret number is...';
  }, 2000);
}

if (localStorage.getItem('scores')) {
  scores = JSON.parse(localStorage.getItem('scores'));
  scoreboard();
}
if (localStorage.getItem('currentPlayer')) {
  player = localStorage.getItem('currentPlayer');
}
newGame();

function findHighScore() {
  if (scores.find(game => game.playerName == player)) {
    let playerScores = scores.filter(score => score.playerName == player);
    playerScores.sort((a, b) => {
      a = parseInt(a.score);
      b = parseInt(b.score);
      return b - a;
    });
    highScore.innerHTML = playerScores[0].score;
  }
}


findHighScore()

function checkGuess(guessedNumber) {
  resultsElem.removeAttribute('class');
  resultsElem.classList.add('material-icons-round');
  resultsElem.classList.add('rotate');
  const tooLow = `higher than ${guessedNumber}.`;
  const tooHigh = `lower than ${guessedNumber}.`;
  const correct = `Congrats!`;
  setTimeout(() => {
    resultsElem.classList.remove('rotate');
    const now = new Intl.DateTimeFormat('en-GB', {
      dateStyle: 'short',
      timeStyle: 'short',
    }).format(new Date());
    if (guessedNumber == secretNumber) {
      resultMsg.innerHTML = correct;
      resultsElem.classList.add('correct');
      secretNumberElem.innerHTML = secretNumber;
      setTimeout(newGame, 3000);
      scores.unshift({
        playerName: player,
        date: now,
        score: gameScore,
      });

      localStorage.setItem('scores', JSON.stringify(scores));
    } else if (guessedNumber > secretNumber) {
      resultMsg.innerHTML = tooHigh;
      resultsElem.classList.add('lower');
    } else {
      resultMsg.innerHTML = tooLow;
      resultsElem.classList.add('higher');
    }
    if (guessedNumber != secretNumber) {
      numTries++;
      let penalty = Math.abs(guessedNumber - secretNumber) * numTries;
      penalty = guessedNumber != prevGuess ? penalty / Math.abs(guessedNumber - prevGuess) : penalty / Math.abs(guessedNumber - secretNumber);
      penalty = Math.round(penalty * 10);
      gameScore = gameScore - penalty;
      prevGuess = guessedNumber;
      currentScore.innerHTML = gameScore;
    }
    findHighScore()
  }, 750);
}

guessBtn.addEventListener('click', () => {
  if (guess.value > 0 && guess.value < 101) {
    checkGuess(guess.value);
  } else {
    guess.value = '';
  }
});
resetBtn.addEventListener('click', () => {
  localStorage.removeItem('scores');
  scoresElem.innerHTML = '';
});

guess.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    guessBtn.click();
  }
});
