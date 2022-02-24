const startBtn = document.querySelector('.startBtn')

startBtn.addEventListener('click', () => {
  let player = document.querySelector('.player_name').value;
  localStorage.setItem('currentPlayer', player)
  location.href = 'game.html'
})