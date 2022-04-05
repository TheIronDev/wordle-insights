import {dictionary} from '../dictionary/frequent_5.js';
const validCharacters = 'abcdefghijklmnopqrstuvwxyz';

export const isFoundInDictionary =
  (attemptedWord: string) => (dictionary.indexOf(attemptedWord) !== -1);

export const isError = (attemptValue: string) => {
  // Attempted word must be 5 characters
  if (attemptValue.length !== 5) return true;
  // Attempted word must only consist of valid characters
  if (!attemptValue
      .split('')
      .every((val) => validCharacters.indexOf(val) !== -1)) return true;
  // Attempted word must be a word in our dictionary
  if (!isFoundInDictionary(attemptValue)) return true;
  return false;
};
