const dictionary = require('../dictionary/frequent_5.json');
const validCharacters = 'abcdefghijklmnopqrstuvwxyz';

exports.isError = (attemptValue) => {
  // Attempted word must be 5 characters
  if (attemptValue.length !== 5) return true;
  // Attempted word must only consist of valid characters
  if (attemptValue
      .split('')
      .every((val) => validCharacters.indexOf(val) !== -1)) return true;
  // Attempted word must be a word in our dictionary
  if (dictionary.indexOf(attemptValue) === -1) return true;
  return false;
};

exports.getHint = (attemptValue, actualValue) => {
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
