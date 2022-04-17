import React, {FunctionComponent} from 'react';
import BoardRowComponent from './BoardRow';
import {Cell, CellState, CompletedGame, Game} from './types';
import styles from '../styles/Board.module.css';


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

function createResults(
    value: string,
    hintChar: string,
    isError: boolean): Cell {
  let state = getCellState(hintChar) || CellState.EMPTY;
  if (isError) state = CellState.ERROR;
  return {
    value,
    state,
  } as Cell;
}

function createResultsRow(
    attempt: string,
    hintString: string,
    isError: boolean): Cell[] {
  const hintArray = hintString.split('');
  return attempt.split('').map((attemptChar, colIndex) =>
    createResults(attemptChar, hintArray[colIndex], isError));
}

function createResultsGrid(attempts: string[], hints: string[]): Cell[][] {
  const isError = false; // Because the previous results are never errors
  return attempts.map((attempt, rowIndex) =>
    createResultsRow(attempt, hints[rowIndex] || '', isError),
  );
}

type BoardProps = {
  game: Game | CompletedGame,
  columns?: number,
  rows?: number,
  isMini?: boolean
};

const BoardComponent: FunctionComponent<BoardProps> =
  ({game, isMini = false, columns = 5, rows = 6}) => {
    const results: Cell[][] = [
      ...createResultsGrid(game.attempts || [], game.hints || []),
    ];
    if (game?.attempt) {
      results.push(
          createResultsRow(
              game.attempt?.value || '',
              '',
              !!game.attempt.isError));
    }

    return (
      <div className={styles.container}>
        {Array.from({length: rows}, (value, index) => {
          return <BoardRowComponent
            key={index}
            isMini={isMini}
            columns={columns}
            results={results && results[index] || []}/>;
        })}
      </div>
    );
  };

export default BoardComponent;
