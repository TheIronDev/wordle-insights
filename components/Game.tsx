import React, {FunctionComponent} from 'react'
import BoardComponent from './Board'
import KeyboardComponent from "./Keyboard";
import {Cell} from './types'
import styles from '../styles/Game.module.css'


type GameProps = {
};

const results:Cell[][] = [[],[]]

const GameComponent: FunctionComponent<GameProps> = (props) => (
    <div className={styles.container}>
        <BoardComponent rows={6} columns={5} results={results} />
        <KeyboardComponent  />
    </div>
)

export default GameComponent