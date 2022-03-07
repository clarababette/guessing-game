import {Game} from '../game.js';
describe('The guessing game class', function () {
  it("should return 'invalid-guess' if the number guessed is greater than 100.", async function () {
    const testGame = new Game();
    const outcome = await testGame.play(123).catch((error) => error.name);
    assert.equal(outcome, 'invalid-guess');
  });
  it("should return 'invalid-guess' if the number guessed is less 1.", async function () {
    const testGame = new Game();
    const outcome = await testGame.play(0).catch((error) => error.name);
    assert.equal(outcome, 'invalid-guess');
  });
  
  it("should not record the play if the guess is invalid.", async function () {
    const testGame = new Game();
    testGame._secretNumber = 87;
    await testGame.play(13).catch((error) => error.name);
    await testGame.play(92).catch((error) => error.name);
    await testGame.play(930).catch((error) => error.name);
    await testGame.play(74).catch((error) => error.name);
    assert.deepEqual(testGame._guesses, [ 74, 92, 13 ]);
  });

  it("should return 'lower' if the number guessed is greater than the secret number.", async function () {
    const testGame = new Game();
    testGame._secretNumber = 5;
    const outcome = await testGame.play(12).catch((error) => error.name);
    assert.equal(outcome, 'lower');
  });
  it("should return 'higher' if the number guessed is less than the secret number.", async function () {
    const testGame = new Game();
    testGame._secretNumber = 40;
    const outcome = await testGame.play(12).catch((error) => error.name);
    assert.equal(outcome, 'higher');
  });

  it("should return the final score if the number guessed is equal to the secret number.", async function () {
    const testGame = new Game();
    testGame._secretNumber = 87;
    await testGame.play(13).catch((error) => error.name);
    await testGame.play(92).catch((error) => error.name);
    await testGame.play(57).catch((error) => error.name);
    await testGame.play(74).catch((error) => error.name);
    const outcome = await testGame.play(87);
    assert.equal(outcome, 885);
  });
});
