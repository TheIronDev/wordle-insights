const {encrypt} = require('./crypto');

module.exports = (word, timestamp) => {
  const {iv: wordIv, data: wordData} = encrypt(word);
  return {
    attempt: {
      value: '',
      isChecking: false,
      isError: false,
      isNotFoundInDictionary: false,
    },
    attempts: [],
    hints: [],
    keyboardHints: {
      '_': 'INCORRECT', // Initial value possibly required
    },
    hints: [],
    created: timestamp,
    isNewGameRequested: false,
    isComplete: false,
    isWon: false,
    wordIv,
    wordData,
  };
};
