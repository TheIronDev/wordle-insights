import React, {FunctionComponent} from 'react'
import {Cell, CellState} from './types'
import styles from "../styles/BoardCell.module.css";

type CellProps = {
    cell: Cell,
};

function getCellStyle(cellState: CellState) {
    switch (cellState) {
        case CellState.INCORRECT:
            return styles.incorrect;
        case CellState.CORRECT:
            return styles.correct;
        case CellState.PARTIAL:
            return styles.partial;
        case CellState.EMPTY:
        case CellState.PENDING:
        default:
            return styles.default;
    }
}

const CellComponent: FunctionComponent<CellProps> = ({cell}) => (
    <div className={[styles.container, getCellStyle(cell?.state)].join(' ')}>
        {cell?.value}
    </div>
)

export default CellComponent