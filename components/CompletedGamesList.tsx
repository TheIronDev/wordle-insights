import React, {FunctionComponent} from 'react';
import {CompletedGame} from './types';
import styles from '../styles/Words.module.css';
import CompletedGamesComponent from './CompletedGame';

type CompletedGamesListProps = {
    games: CompletedGame[]
};

const CompletedGamesListComponent: FunctionComponent<CompletedGamesListProps> =
  ({games}) => (
    <ul className={styles.container}>
      {games.map(
          (game: CompletedGame) => {
            return <CompletedGamesComponent key={game.id} game={game}/>;
          })}
    </ul>
  );

export default CompletedGamesListComponent;
