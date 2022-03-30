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