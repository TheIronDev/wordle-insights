import React, {FunctionComponent} from 'react'
import CellComponent from './BoardCell'
import {Cell} from './types'
import styles from "../styles/BoardRow.module.css";

type RowProps = {
    columns: number,
    results: Cell[]
};

const RowComponent: FunctionComponent<RowProps> = (props) => (
    <div className={styles.container}>
        {Array.from({length: props.columns}, (value, index) => {
            return <CellComponent key={index} cell={props.results[index]} />
        })}
    </div>
);

export default RowComponent;