import React, {FunctionComponent} from 'react'
import RowComponent from './BoardRow'
import {Cell, CellState, Game} from './types'
import styles from '../styles/Board.module.css'

import {doc} from "firebase/firestore";
import {db} from '../firebase'
import {useDocumentData} from "react-firebase-hooks/firestore";


type BoardProps = {
    game: Game,
};

function getCellState(hintState: string): CellState {
    switch (hintState) {
        case '0':
            return CellState.INCORRECT;
        case '1':
            return CellState.PARTIAL;
        case '2':
            return CellState.CORRECT;
        default:
            return CellState.EMPTY;
    }
}

function createResults(attemptChar: string, hintChar: string): Cell {
    return {
        value: attemptChar,
        state: getCellState(hintChar) || CellState.EMPTY
    } as Cell;
}

function createResultsRow(attempt: string, hintString: string): Cell[] {
    const hintArray = hintString.split('');
    return attempt.split('').map((attemptChar, colIndex) =>
        createResults(attemptChar, hintArray[colIndex]));
}

function createResultsGrid(attempts: string[], hints: string[]): Cell[][] {
    return attempts.map((attempt, rowIndex) => createResultsRow(attempt, hints[rowIndex] || '')
    )
}

const BoardComponent: FunctionComponent<BoardProps> = ({game}) => {
    const columns = 5;
    const rows = 6;

    const results: Cell[][] = [
        ...createResultsGrid(game.attempts || [], game.hints || []),
        createResultsRow(game.attempt?.value || '', '')
    ];

    return (
        <div className={styles.container}>
            {Array.from({length: rows}, (value, index) => {
                return <RowComponent key={index} columns={columns} results={results && results[index] || []}/>
            })}
        </div>
    )
}

export default BoardComponent