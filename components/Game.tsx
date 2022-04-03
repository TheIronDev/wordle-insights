import React, {FunctionComponent} from 'react'
import BoardComponent from './Board'
import KeyboardComponent from "./Keyboard";
import {Game, KeyboardHints, KeyboardKey, KeyboardKeyType} from './types'
import styles from '../styles/Game.module.css'
import {doc, setDoc} from "firebase/firestore";
import {db} from "../firebase";
import {useDocumentData} from "react-firebase-hooks/firestore";


type GameProps = {
    uid: string
};

function onKeyClick(keyboardKey:KeyboardKey, gameData: Game, gameRef) {
    let attemptValue = gameData.attempt.value;
    let attempt = {...gameData.attempt}
    switch (keyboardKey.type) {
        case KeyboardKeyType.CHAR:
            attemptValue = attemptValue + keyboardKey.display;
            attempt.value = attemptValue;
            if (attemptValue.length <= 5) {
                setDoc(gameRef, Object.assign({}, gameData, {attempt}))
            }
            break;
        case KeyboardKeyType.DELETE:
            if (attemptValue) {
                attempt.value = attemptValue.slice(0, -1);
            }
            setDoc(gameRef, Object.assign({}, gameData, {attempt}))
            break;
        case KeyboardKeyType.SUBMIT:
            attempt.isChecking = true;

            setDoc(gameRef, Object.assign({}, gameData, {attempt}))
            break;
        case KeyboardKeyType.UNKNOWN:
        default:
    }
}


const GameComponent: FunctionComponent<GameProps> = ({uid}) => {
    let gameRef = doc(db, 'games', uid);
    const [game] = useDocumentData(gameRef);

    const keyboardCallback = (keyboardKey: KeyboardKey) => {
        onKeyClick(keyboardKey, game as Game, gameRef);
    }

    if (!game) {
        return (<div>Start a new game?</div>)
    }

    return (
    <div className={styles.container}>
        <BoardComponent game={game as Game} />
        <KeyboardComponent
            keyboardCallback={keyboardCallback}
            keyboardHints={game.keyboardHints as KeyboardHints} />
    </div>
        )
}

export default GameComponent