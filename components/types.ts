export enum CellState {
    EMPTY,
    PENDING,
    INCORRECT,
    CORRECT,
    PARTIAL,
    ERROR,
}

export type Cell = {
    value: string,
    state: CellState,
};

// Mapping of letters to their keyboard state
export type KeyboardHints = {
   [key: string]: string|undefined // INCORRECT, PARTIAL, CORRECT
}

export type Attempt = {
    value: string,
    isChecking: boolean,
    isError: boolean
}

export type Game = {
    attempt: Attempt,
    attempts: string[],
    hints: string[],
    keyboardHints: KeyboardHints
    isComplete: boolean,
    isWon: boolean,
};

export enum KeyboardKeyType {
    UNKNOWN,
    CHAR,
    DELETE,
    SUBMIT
}

export enum KeyboardKeyStatus {
   UNKNOWN,
    INCORRECT,
    PARTIAL,
    CORRECT
}

export type KeyboardKey = {
    display: string,
    value: string,
    type: KeyboardKeyType,
    status: KeyboardKeyStatus
}
