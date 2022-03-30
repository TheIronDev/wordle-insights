import React, {FunctionComponent} from 'react'
import RowComponent from './BoardRow'
import {Cell} from './types'
import styles from '../styles/Board.module.css'


type BoardProps = {
    rows: number,
    columns: number,
    results: Cell[][]
};

const BoardComponent: FunctionComponent<BoardProps> = (props) => (
    <div className={styles.container}>
        {Array.from({length: props.rows}, (value, index) => {
            return <RowComponent key={index} columns={props.columns} results={props.results && props.results[index] || []} />
        })}
    </div>
)

export default BoardComponent