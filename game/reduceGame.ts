import {decrypt} from './crypto.js';
import {createAttempt, createHint, createKeyboardHintsMap} from './create.js';
import {isError, isFoundInDictionary} from './checkGame.js';
import {Game} from './types.js';

const getWord = (game: Game) => {
  return decrypt(game.wordIv, game.wordData);
};

export const handleClientsideMutation = (game: Game) => game; // No-op
export const handleIsComplete = (game: Game) => game; // No-op
export const handleNewGameRequested = (game: Game) => game; // No-op
export const handleError = (game: Game) => {
  // Stop the infinite loops today!
  game.attempt.isChecking = false;
  game.attempt.isError = true;

  // Not found in dictionary is a different type of error we want to handle
  game.attempt.isNotFoundInDictionary =
    !isFoundInDictionary(game.attempt.value);

  return game;
};
export const handleAttempt = (game: Game) => {
  // Stop the infinite loops today!
  game.attempt.isChecking = false;

  const attemptWord = game.attempt.value;
  const expectedWord = getWord(game);

  // Modify
  game.attempt = createAttempt();
  game.attempts.push(attemptWord);

  const hint = createHint(attemptWord, expectedWord);
  game.hints.push(hint);
  game.keyboardHints =
    createKeyboardHintsMap(game.keyboardHints, attemptWord, hint);

  game.isWon = expectedWord === attemptWord;
  game.isComplete =
    (expectedWord === attemptWord) || (game.attempts.length >= 6);

  return game;
};
export const getAction = (game: Game) => {
  // If a new game is requested, overwrite existing game
  if (game.isNewGameRequested) {
    return 'NEW_GAME_REQUESTED';
  }

  // If game is marked as complete, no-op.
  if (game.isComplete) {
    return 'IS_COMPLETE';
  }

  // If game is not checking an attempt, then no-op the client-side mutation
  if (!game.attempt.isChecking) {
    return 'CLIENTSIDE_MUTATION';
  }

  if (isError(game.attempt.value)) {
    return 'ERROR';
  }
  return 'ATTEMPT';
};

export const reduceGame = (game: Game) => {
  const action = getAction(game);
  const updatedGame = {...game};
  updatedGame.attempt = {...game.attempt};
  switch (action) {
    case 'IS_COMPLETE': return handleIsComplete(updatedGame);
    case 'NEW_GAME_REQUESTED': return handleNewGameRequested(updatedGame);
    case 'ERROR': return handleError(updatedGame);
    case 'ATTEMPT': return handleAttempt(updatedGame);
    case 'CLIENTSIDE_MUTATION': return handleClientsideMutation(updatedGame);
    default:
  }

  return updatedGame;
};
