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
    isError: boolean,
    isNotFoundInDictionary: boolean
}

export type Game = {
    wordSolution?: string,
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

export type Word = {
    id: string;
    wins: number
    losses: number
    wins_1_turn: number;
    wins_2_turn: number;
    wins_3_turn: number;
    wins_4_turn: number;
    wins_5_turn: number;
    wins_6_turn: number;
}

export type CompletedGame = {
    id?: string,
    attemptCount: number
    isWon: boolean
    word: string
    created: string,
    uid: string,
    attempt?: undefined,
    attempts?: string[],
    hints?: string[],
}

export type User = {
    displayName: string;
    id: string;
    total: number
    wins: number
    losses: number
    games?: CompletedGame[];
    wins_1_turn: number;
    wins_2_turn: number;
    wins_3_turn: number;
    wins_4_turn: number;
    wins_5_turn: number;
    wins_6_turn: number;
}