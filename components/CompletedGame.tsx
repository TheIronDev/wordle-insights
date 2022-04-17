import React, {FunctionComponent} from 'react';
import {CompletedGame} from './types';
import styles from '../styles/CompletedGame.module.css';
import Board from './Board';

type WordProp = {
  game: CompletedGame
}

const CompletedGamesComponent: FunctionComponent<WordProp> = ({game}) => {
  const rows = game?.attempts?.length;
  const attemptCount = game?.attempts?.length || 0;
  const winLossText = game.isWon ? `Won in ${attemptCount}` : `Loss`;
  const className = [
    styles.container,
    game.isWon ? styles.isWon : styles.isLoss,
  ].join(' ');

  return <div key={game.id} className={className}>
    <div>
      <div className={styles.word}>
        {game.word}
      </div>
      <div className={styles.winLossText}>
        {winLossText}
      </div>
    </div>
    <div className={styles.miniBoardContainer}>
      <Board game={game} isMini={true} rows={rows} />
    </div>
  </div>;
};

export default CompletedGamesComponent;
