import {Game, KeyboardHintMap} from './types';
import {encrypt, decrypt} from './crypto.js';

export const createAttempt = () => ({
  value: '',
  isChecking: false,
  isError: false,
  isNotFoundInDictionary: false,
});

export const createGame = (word: string, timestamp: FirebaseFirestore.Timestamp): Game => {
  const {iv: wordIv, data: wordData} = encrypt(word);
  console.log(word, wordIv, wordData, decrypt(wordIv, wordData));
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

export const createKeyboardHintsMap =
  (initialKeyboardHints: KeyboardHintMap, attemptWord:string, attemptHint: string) => {
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