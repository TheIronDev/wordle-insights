import {CompletedGame, Game, KeyboardHintMap, Profile} from './types';
import {decrypt, encrypt} from './crypto.js';
import {UserRecord} from 'firebase-functions/lib/common/providers/identity';

export const createAttempt = () => ({
  value: '',
  isChecking: false,
  isError: false,
  isNotFoundInDictionary: false,
});

export const createGame =
  (word: string, timestamp: FirebaseFirestore.Timestamp): Game => {
    const {iv: wordIv, data: wordData} = encrypt(word);
    return {
      attempt: createAttempt(),
      attempts: [],
      hints: [],
      keyboardHints: {
        '_': 'INCORRECT', // Initial value possibly required
      },
      created: timestamp,
      isNewGameRequested: false,
      isComplete: false,
      isWon: false,
      wordIv,
      wordData,
    } as Game;
  };

export const createCompletedGame = (
    game: Game,
    uid: string,
    timestamp: FirebaseFirestore.Timestamp): CompletedGame => {
  const word = decrypt(game.wordIv, game.wordData);
  return {
    attemptCount: game.attempts.length,
    attempts: game.attempts,
    hints: game.hints,
    created: timestamp,
    isWon: game.isWon,
    word: word,
    uid: uid,
  } as CompletedGame;
};

export const createHint = (attemptValue: string, actualValue: string) => {
  const hints = [...Array(actualValue.length)].map(() => 0);
  const actualCharacters = new Set(actualValue.split(''));

  for (let index = 0; index < attemptValue.length; index++) {
    if (attemptValue[index] === actualValue[index]) {
      hints[index] = 2;
      actualCharacters.delete(attemptValue[index]);
    } else if (actualCharacters.has(attemptValue[index])) {
      hints[index] = 1;
    }
  }
  return hints.join('');
};

export const createKeyboardHintsMap = (
    initialKeyboardHints: KeyboardHintMap,
    attemptWord:string,
    attemptHint: string) => {
  const keyboardHints = {...initialKeyboardHints};
  for (let index = 0; index < attemptWord.length; index++) {
    const hintChar = attemptWord[index];
    const hintValue = attemptHint[index];
    if (!keyboardHints[hintChar]) {
      keyboardHints[hintChar] = hintValue;
    } else if (keyboardHints[hintChar] === '1' && hintValue == '2') {
      keyboardHints[hintChar] = hintValue;
    }
  }

  return keyboardHints;
};

export const createProfile = (
    user: UserRecord,
    timestamp: FirebaseFirestore.Timestamp): Profile => {
  return {
    displayName: user.displayName,
    userName: user.uid,
    photoUrl: user.photoURL,
    created: timestamp,
  };
};
