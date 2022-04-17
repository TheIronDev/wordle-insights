import React, {FunctionComponent} from 'react';
import {CompletedGame} from './types';
import styles from '../styles/CompletedGameList.module.css';
import CompletedGamesComponent from './CompletedGame';

type CompletedGamesListProps = {
    games: CompletedGame[]
};

const CompletedGamesListComponent: FunctionComponent<CompletedGamesListProps> =
  ({games}) => (
    <div className={styles.container}>
      {games.map(
          (game: CompletedGame) => {
            return <CompletedGamesComponent key={game.id} game={game}/>;
          })}
    </div>
  );

export default CompletedGamesListComponent;
