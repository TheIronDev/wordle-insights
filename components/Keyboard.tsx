import React, {FunctionComponent} from 'react'
import {Cell} from './types'
import styles from '../styles/Keyboard.module.css'

const keyRows = [
    ['q','w','e','r','t','y','u','i','o','p'],
    ['a','s','d','f','g','h','j','k','l'],
    ['z','x','c','v','b','n','m'],
]

type KeyProps = {
    display: string
};
const KeyComponent: FunctionComponent<KeyProps> = ({display}) => (
    <button className={styles.key}>{display}</button>
);

type KeyboardRowProps = {
    keys: string[]
};
const KeyboardRowComponent: FunctionComponent<KeyboardRowProps> = ({keys}) => (
    <div className={styles.row}>
      {keys.map((key, index) => (<KeyComponent key={index} display={key} />))}
    </div>
);

type KeyboardProps = {
};
const KeyboardComponent: FunctionComponent<KeyboardProps> = (props) => (
    <div className={styles.container}>
        {keyRows.map((keyRow, index) => {
            return <KeyboardRowComponent key={index} keys={keyRow}/>
        })}
    </div>
)

export default KeyboardComponent