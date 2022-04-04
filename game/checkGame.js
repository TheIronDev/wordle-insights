const dictionary = require('../dictionary/frequent_5.json');
const validCharacters = 'abcdefghijklmnopqrstuvwxyz';

export const isFoundInDictionary =
  (attemptedWord) => (dictionary.indexOf(attemptedWord) !== -1);

export const isError = (attemptValue) => {
  // Attempted word must be 5 characters
  if (attemptValue.length !== 5) return true;
  // Attempted word must only consist of valid characters
  if (attemptValue
      .split('')
      .every((val) => validCharacters.indexOf(val) !== -1)) return true;
  // Attempted word must be a word in our dictionary
  if (!isFoundInDictionary(attemptValue)) return true;
  return false;
};
