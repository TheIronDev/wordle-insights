import React, {FunctionComponent} from 'react';
import RowComponent from './BoardRow';
import {Cell, CellState, Game} from './types';
import styles from '../styles/Board.module.css';


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

const BoardComponent: FunctionComponent<BoardProps> = ({game}) => {
  const columns = 5;
  const rows = 6;

  const results: Cell[][] = [
    ...createResultsGrid(game.attempts || [], game.hints || []),
    createResultsRow(game.attempt?.value || '', '', !!game.attempt.isError),
  ];

  return (
    <div className={styles.container}>
      {Array.from({length: rows}, (value, index) => {
        return <RowComponent
          key={index}
          columns={columns}
          results={results && results[index] || []}/>;
      })}
    </div>
  );
};

export default BoardComponent;
