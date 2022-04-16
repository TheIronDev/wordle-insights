import React, {FunctionComponent} from 'react';
import {CompletedGame} from './types';
import styles from '../styles/CompletedGame.module.css';

type WordProp = {
  game: CompletedGame
}

const CompletedGamesComponent: FunctionComponent<WordProp> = ({game}) => {
  return <li key={game.id} className={styles.container}>
    <div className={styles.word}>
      {game.word}
    </div>
    <div className={styles.isWon}>
      {game.isWon ? 'Win' : 'Loss'}
    </div>
    <div className={styles.isWon}>
      TODO
    </div>
  </li>;
};

export default CompletedGamesComponent;
