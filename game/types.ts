export type User = {
  uid: string
};
export type Profile = {
  displayName: string|undefined,
  userName: string|undefined,
  created: FirebaseFirestore.Timestamp,
};

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
  created: FirebaseFirestore.Timestamp,
  hints: string[],
  keyboardHints: KeyboardHintMap,
  isNewGameRequested: boolean,
  isComplete: boolean,
  isWon: boolean,
  wordIv: string,
  wordData: string,
  wordSolution: string,
};

export type CompletedGame = {
  attemptCount: number,
  attempts: string[],
  hints: string[],
  uid: string,
  isWon: boolean,
  word: string,
};
