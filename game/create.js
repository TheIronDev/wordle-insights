const {encrypt} = require('./crypto');

export const createAttempt = () => ({
  value: '',
  isChecking: false,
  isError: false,
  isNotFoundInDictionary: false,
});

export const createGame = (word, timestamp) => {
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
  };
};

export const createHint = (attemptValue, actualValue) => {
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
  (initialKeyboardHints, attemptWord, attemptHint) => {
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
