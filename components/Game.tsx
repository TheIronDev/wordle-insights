import React, {FunctionComponent} from 'react'
import BoardComponent from './Board'
import KeyboardComponent from "./Keyboard";
import {Cell} from './types'
import styles from '../styles/Game.module.css'
import {doc, getDoc} from "firebase/firestore";
import {db} from "../firebase";
import {useDocumentData} from "react-firebase-hooks/firestore";


type GameProps = {
    uid: string
};

const GameComponent: FunctionComponent<GameProps> = ({uid}) => {
    let profileRef = doc(db, 'profiles', uid);
    const [profile] = useDocumentData(profileRef);

    if (!(profile && profile.currentGameId)) {
        return (<div>Start a new game?</div>)
    }
    return (
    <div className={styles.container}>
        <BoardComponent gameId={profile.currentGameId} />
        <KeyboardComponent  />
    </div>
        )
}

export default GameComponent