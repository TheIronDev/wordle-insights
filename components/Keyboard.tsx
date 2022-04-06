import React, {FunctionComponent} from 'react';
import styles from '../styles/Keyboard.module.css';
import {
  KeyboardHints,
  KeyboardKey,
  KeyboardKeyStatus,
  KeyboardKeyType,
} from './types';

const keyRows = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['SUBMIT', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'DELETE'],
];

function getKeyboardStatus(
    key:string,
    keyboardHints: KeyboardHints): KeyboardKeyStatus {
  switch (keyboardHints[key]) {
    case '0': return KeyboardKeyStatus.INCORRECT;
    case '2': return KeyboardKeyStatus.CORRECT;
    case '1': return KeyboardKeyStatus.PARTIAL;
    default: return KeyboardKeyStatus.UNKNOWN;
  }
}

function convertKeyStringToKeyboardKey(
    key:string,
    keyboardHints: KeyboardHints): KeyboardKey {
  switch (key) {
    case 'SUBMIT':
      return {display: 'check', type: KeyboardKeyType.SUBMIT} as KeyboardKey;
    case 'DELETE':
      return {
        display: 'keyboard_backspace',
        type: KeyboardKeyType.DELETE,
      } as KeyboardKey;
    default:
  }
  return {
    display: key,
    type: KeyboardKeyType.CHAR,
    status: getKeyboardStatus(key, keyboardHints),
  } as KeyboardKey;
}

const keyboardKeys = (keyRows: string[][], keyboardHints: KeyboardHints) =>
  keyRows.map(
      (keyRow) => (keyRow.map(
          (key) => convertKeyStringToKeyboardKey(key, keyboardHints))));

function getKeyboardStateClass(keyboardKeyStatus: KeyboardKeyStatus) {
  switch (keyboardKeyStatus) {
    case KeyboardKeyStatus.INCORRECT:
      return styles.incorrect;
    case KeyboardKeyStatus.PARTIAL:
      return styles.partial;
    case KeyboardKeyStatus.CORRECT:
      return styles.correct;
    default:
      return styles.unknown;
  }
}

function getKeyboardTypeClass(keyboardKeyType: KeyboardKeyType) {
  switch (keyboardKeyType) {
    case KeyboardKeyType.DELETE: // Passthrough intentional
    case KeyboardKeyType.SUBMIT:
      return 'material-icons';
    case KeyboardKeyType.UNKNOWN:
    case KeyboardKeyType.CHAR:
    default:
      return '';
  }
}

type KeyProps = {
    keyboardKey: KeyboardKey,
    keyboardCallback: any
};
const KeyComponent: FunctionComponent<KeyProps> =
  ({keyboardKey, keyboardCallback}) => (
    <button
      className={[
        styles.key,
        getKeyboardStateClass(keyboardKey.status),
        getKeyboardTypeClass(keyboardKey.type),
      ].join(' ')}
      onClick={() => keyboardCallback(keyboardKey)}>
      <span className={getKeyboardTypeClass(keyboardKey.type)}>
        {keyboardKey.display}
      </span>
    </button>
  );

type KeyboardRowProps = {
    keys: KeyboardKey[],
    keyboardCallback: any
};
const KeyboardRowComponent: FunctionComponent<KeyboardRowProps> =
  ({keys, keyboardCallback}) => (
    <div className={styles.row}>
      {keys.map((key, index) =>
        (<KeyComponent
          key={index}
          keyboardKey={key}
          keyboardCallback={keyboardCallback} />))}
    </div>
  );

type KeyboardProps = {
    keyboardCallback: Function,
    keyboardHints: KeyboardHints
};
const KeyboardComponent: FunctionComponent<KeyboardProps> =
  ({keyboardHints, keyboardCallback}) => (
    <div className={styles.container}>
      {keyboardKeys(keyRows, keyboardHints).map((keyRow, index) => {
        return <KeyboardRowComponent
          key={index}
          keys={keyRow}
          keyboardCallback={keyboardCallback} />;
      })}
    </div>
  );

export default KeyboardComponent;
