import React, {FunctionComponent} from 'react';
import {Cell, CellState} from './types';
import styles from '../styles/BoardCell.module.css';

type CellProps = {
    cell: Cell,
};

/**
 * @return Css class based on the cell state
 */
function getCellStyle(cellState: CellState): string {
  switch (cellState) {
    case CellState.INCORRECT:
      return styles.incorrect;
    case CellState.CORRECT:
      return styles.correct;
    case CellState.PARTIAL:
      return styles.partial;
    case CellState.ERROR:
      return styles.error;
    case CellState.EMPTY:
    case CellState.PENDING:
    default:
      return styles.default;
  }
}

const CellComponent: FunctionComponent<CellProps> = ({cell}) => (
  <div className={[styles.container, getCellStyle(cell?.state)].join(' ')}>
    <span className={styles.letter}>{cell?.value}</span>
  </div>
);

export default CellComponent;
