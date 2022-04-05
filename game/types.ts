export type User = {};
export type Profile = {};
export type Attempt = {
  value: string,
  isChecking: boolean,
  isError: boolean,
  isNotFoundInDictionary: boolean,
};
export type KeyboardHintMap = {
  [key: string]: string
}
export type Game = {
  attempt: Attempt,
  attempts: string[],
  hints: string[],
  keyboardHints: KeyboardHintMap,
  isNewGameRequested: boolean,
  isComplete: boolean,
  isWon: boolean,
  wordIv: string,
  wordData: string,
};

export type CompletedGame = {
  attemptCount: number,
  attempts: string[],
  hints: string[],
  uid: string,
  isWon: boolean,
  word: string,
};