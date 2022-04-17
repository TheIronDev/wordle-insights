import React, {FunctionComponent} from 'react';
import BoardCellComponent from './BoardCell';
import {Cell} from './types';
import styles from '../styles/BoardRow.module.css';

type RowProps = {
  columns: number,
  isMini?: boolean,
  results: Cell[]
};

const BoardRowComponent: FunctionComponent<RowProps> =
  ({columns, results, isMini = false}) => (
    <div className={styles.container}>
      {Array.from({length: columns}, (value, index) => {
        return <BoardCellComponent
          key={index}
          isMini={isMini}
          cell={results[index]} />;
      })}
    </div>
  );

export default BoardRowComponent;
