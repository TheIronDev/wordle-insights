import React, {FunctionComponent} from 'react'
import styles from '../styles/Keyboard.module.css'
import {KeyboardKeyType, KeyboardKey, Game} from './types'

const keyRows = [
    ['q','w','e','r','t','y','u','i','o','p'],
    ['a','s','d','f','g','h','j','k','l'],
    ['SUBMIT', 'z','x','c','v','b','n','m', 'DELETE'],
]

function convertKeyStringToKeyboardKey(key:string): KeyboardKey {
    switch (key) {
        case 'SUBMIT':
            return {display: '✅️', type: KeyboardKeyType.SUBMIT} as KeyboardKey;
        case 'DELETE':
            return {display: '⬅️', type: KeyboardKeyType.DELETE} as KeyboardKey;
        default:
    }
    return {display: key, type: KeyboardKeyType.CHAR} as KeyboardKey;
}

const keyboardKeys = keyRows
    .map((keyRow) =>
        (keyRow.map(convertKeyStringToKeyboardKey)));

type KeyProps = {
    keyboardKey: KeyboardKey,
    keyboardCallback: any
};
const KeyComponent: FunctionComponent<KeyProps> = ({keyboardKey,  keyboardCallback}) => (
    <button className={styles.key} onClick={() => keyboardCallback(keyboardKey)}>{keyboardKey.display}</button>
);

type KeyboardRowProps = {
    keys: KeyboardKey[],
    keyboardCallback: any
};
const KeyboardRowComponent: FunctionComponent<KeyboardRowProps> = ({keys,  keyboardCallback}) => (
    <div className={styles.row}>
      {keys.map((key, index) => (<KeyComponent key={index} keyboardKey={key} keyboardCallback={keyboardCallback} />))}
    </div>
);

type KeyboardProps = {
    keyboardCallback: Function,
    game: Game
};
const KeyboardComponent: FunctionComponent<KeyboardProps> = ({keyboardCallback}) => (
    <div className={styles.container}>
        {keyboardKeys.map((keyRow, index) => {
            return <KeyboardRowComponent key={index} keys={keyRow} keyboardCallback={keyboardCallback} />
        })}
    </div>
)

export default KeyboardComponent