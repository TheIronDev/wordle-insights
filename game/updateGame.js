const {decrypt} = require('./crypto');
const dictionary = require('../dictionary/frequent_5.json');
const {isError, getHint} = require('./checkGame');

module.exports = (game) => {
  // If the game is complete, don't perform any function operations.
  if (game.isComplete) {
    return;
  }

  // If a new game is requested, overwrite existing game
  if (game.isNewGameRequested) {
    // TODO - find a word the user hasn't attempted
    // TODO - create a new game, and overwrite the existing game
    console.log('isNewGameRequested');
    return;
  }


  // If we are not checking for a new attempt, then no-op function behavior
  if (!(game.attempt && game.attempt.isChecking)) {
    return;
  }

  const updatedGame = {...game};

  const {attempt, wordIv, wordData} = game;
  const attemptValue = attempt.value;
  const word = decrypt(wordIv, wordData);

  // Always "clear" isChecking so we don't fall into a loop
  updatedGame.attempt.isChecking = false;

  if (isError(attemptValue)) {
    updatedGame.attempt.isError = true;
    updatedGame.attempt.isNotFoundInDictionary =
      (dictionary.indexOf(attemptValue) === -1);
    // TODO - save changes
    return;
  }

  // Word matched!
  if (word === attemptValue) {
    updatedGame.isComplete = true;
    updatedGame.isWon = true;
    // TODO - save changes
    // TODO - update completedGames collection
    return;
  }

  updatedGame.attempts.push(attemptValue);
  updatedGame.hints.push(getHint(attemptValue, word));
  // TODO - update keyboard hints


  // If they are all out of attempts
  if (game.attempts.length >= 6) {
    game.isComplete = true;
    // TODO - update completedGames collection
  }

};
