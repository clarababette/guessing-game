let secretNumber;
const resultMsg = document.querySelector('.result_msg');
const guess = document.querySelector('.guess');
const guessBtn = document.querySelector('.guess_btn');
const newGameMsg = document.querySelector('.new_game_msg');

function newGame() {
  secretNumber = Math.ceil(Math.random() * 100);
  resultMsg.innerHTML = '';
  guess.value = undefined;
  newGameMsg.innerHTML = 'New game started!';
  setTimeout(() => {
    newGameMsg.innerHTML = '';
  }, 3000);
}

newGame();

function checkGuess(guessedNumber) {
  const tooLow = 'Your guess is too low';
  const tooHigh = 'Your guess is too high';
  const correct = `Correct, the secret number is ${secretNumber}`;
  let result =
    guessedNumber == secretNumber
      ? correct
      : guessedNumber > secretNumber
      ? tooHigh
      : tooLow;
  resultMsg.innerHTML = result;
  result == correct ? setTimeout(newGame, 3000) : undefined;
}

guessBtn.addEventListener('click', () => {
  checkGuess(guess.value);
});
