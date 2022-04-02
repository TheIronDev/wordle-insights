export enum CellState {
    EMPTY,
    PENDING,
    INCORRECT,
    CORRECT,
    PARTIAL,
}

export type Cell = {
    value: string,
    state: CellState,
};

export type Attempt = {
    value: string,
    isChecking: false,
    isError: false
}

export type Game = {
    attempt: Attempt,
    attempts: string[],
    hints: string[],
    isComplete: boolean,
    isWon: boolean,
};

export enum KeyboardKeyType {
    UNKNOWN,
    CHAR,
    DELETE,
    SUBMIT
}

export type KeyboardKey = {
    display: string,
    value: string,
    type: KeyboardKeyType,
}