import React, {FunctionComponent} from 'react'
import {Cell} from './types'
import styles from "../styles/BoardCell.module.css";

type CellProps = {
    cell: Cell,
};

const CellComponent: FunctionComponent<CellProps> = ({cell}) => (
    <div className={styles.container}>
        {cell?.value}
    </div>
)

export default CellComponent