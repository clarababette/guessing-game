import {sortByProp} from './useful_functions.js';

export class GameStats {
  constructor(scores = [], player = 'anonymous') {
    this._scores = scores;
    this._player = player;
  }
  get scores() {
    return sortByProp(this._scores, 'score');
  }
  get playerHighScore() {
    let scores = this.scores;
    let playerScores = scores.filter(
      (score) => score.playerName == this._player,
    );
    return playerScores.length != 0 ? playerScores[0].score : '000';
  }
  /**
   * @param {number} newScore
   */
  set updateScores(newScore) {
    const now = new Intl.DateTimeFormat('en-GB', {
      dateStyle: 'short',
      timeStyle: 'short',
    }).format(new Date());
    const game = {playerName: this._player, date: now, score: newScore};
    this._scores = [game, ...this._scores];
  }
  resetScores() {
    this._scores = [];
  }
}

export class Game {
  constructor() {
    this.newGame();
  }
  newGame() {
    this._score = 1000;
    
    this._guesses = [];
    this._secretNumber = Math.ceil(Math.random() * 100);
  }
  play(guess) {
   
    return new Promise((resolve, reject) => {
      if (guess > 100 || guess < 1) {
        reject({
          name: 'invalid-guess',
          message: 'between 1 and 100, your guess should be too.',
          score: this._score,
        });
      } else {
        this._guesses = Array.isArray(this._guesses) ? [guess, ...this._guesses] : [guess];
        if (guess == this._secretNumber) {
          resolve(this._score);
        } else {
          let prevGuess = this._guesses[1] || 0;
          let penalty =
            Math.abs(guess - this._secretNumber) * this._guesses.length;
          penalty =
            guess != prevGuess
              ? penalty / Math.abs(guess - prevGuess)
              : penalty / Math.abs(guess - this.secretNumber);
          penalty = Math.round(penalty * 10);
          this._score -= penalty;
          if (guess > this._secretNumber) {
            reject({
              name: 'lower',
              message: `lower than ${guess}.`,
              score: this._score,
            });
          } else {
            reject({
              name: 'higher',
              message: `higher than ${guess}.`,
              score: this._score,
            });
          }
        }
      }
    });
  }
}
