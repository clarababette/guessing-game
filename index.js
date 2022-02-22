let secretNumber;
const resultMsg = document.querySelector('.result_msg');
const guess = document.querySelector('.guess');
const guessBtn = document.querySelector('.guess_btn');
const resetBtn = document.querySelector('.reset_btn');
const newGameMsg = document.querySelector('.new_game_msg');
let scores = [];

const scoresElem = document.querySelector('.scores');
let gameScore; 



function scoreboard() {
  scoresElem.innerHTML = '<th>Game played on...</th> <th>Score</th>';
  for (const myScore of scores) {
    const row = document.createElement('tr');
    const date = document.createElement('td');
    const score = document.createElement('td');
  
    date.innerHTML = myScore.date;
    score.innerHTML = myScore.score;
    row.appendChild(date);
    row.appendChild(score);
    scoresElem.appendChild(row)
  }
}

function newGame() {
  scoreboard();
  gameScore = 100;
  secretNumber = Math.ceil(Math.random() * 100);
  resultMsg.innerHTML = '';
  guess.value = undefined;
  newGameMsg.innerHTML = 'New game started!';
  setTimeout(() => {
    newGameMsg.innerHTML = '';
  }, 3000);
}

if (localStorage.getItem('scores')) {
  scores = JSON.parse(localStorage.getItem('scores'));
  scoreboard()
}
newGame();

function checkGuess(guessedNumber) {
  const tooLow = `${guessedNumber} is too low.`;
  const tooHigh = `${guessedNumber} is too high.`;
  const correct = `Correct, the secret number is ${secretNumber}`;
  let result =
    guessedNumber == secretNumber
      ? correct
      : guessedNumber > secretNumber
      ? tooHigh
      : tooLow;
  resultMsg.innerHTML = result;
  const now = new Intl.DateTimeFormat('en-GB', { dateStyle: 'short', timeStyle: 'short' }).format(new Date())
  if (result == correct) {
    setTimeout(newGame, 3000);
    scores.unshift({
      date: now,
      score: gameScore
    })
    localStorage.setItem('scores', JSON.stringify(scores))
  } else {
    gameScore--;
  }
}

guessBtn.addEventListener('click', () => {
  checkGuess(guess.value);
});
resetBtn.addEventListener('click', () => {
  localStorage.removeItem('scores');
  scoresElem.innerHTML = '';
});

guess.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    guessBtn.click();
  }
})
