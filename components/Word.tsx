import React, {FunctionComponent} from 'react';
import {Word} from './types';
import styles from '../styles/Words.module.css';

type WordProp = {
  word: Word
}

const WordComponent: FunctionComponent<WordProp> = ({word}) => {
  const percent = word.wins ?
    (word.wins + word.losses) / word.wins * 100 :
    0;
  const max = Math.max(
      word.wins_1_turn,
      word.wins_2_turn,
      word.wins_3_turn,
      word.wins_4_turn,
      word.wins_5_turn,
      word.wins_6_turn,
  ) || 1;
  const distributionStyles = {
    1: {width: (word.wins_1_turn / max) * 100 + '%'},
    2: {width: (word.wins_2_turn / max) * 100 + '%'},
    3: {width: (word.wins_3_turn / max) * 100 + '%'},
    4: {width: (word.wins_4_turn / max) * 100 + '%'},
    5: {width: (word.wins_5_turn / max) * 100 + '%'},
    6: {width: (word.wins_6_turn / max) * 100 + '%'},
  };
  const distributionTitles = {
    1: word.wins_1_turn + ' wins',
    2: word.wins_2_turn + ' wins',
    3: word.wins_3_turn + ' wins',
    4: word.wins_4_turn + ' wins',
    5: word.wins_5_turn + ' wins',
    6: word.wins_6_turn + ' wins',
  };

  return <li key={word.id} className={styles.wordRow}>
    <div className={styles.word}>
      {word.id}
    </div>
    <div className={styles.percent}>
      {percent}% <sub>({word.wins}/{word.losses})</sub>
    </div>
    <div className={styles.distributions}>
      <div
        className={styles.distributionPercent}
        style={distributionStyles['1']}
        title={distributionTitles['1']}></div>
      <div
        className={styles.distributionPercent}
        style={distributionStyles['2']}
        title={distributionTitles['2']}></div>
      <div
        className={styles.distributionPercent}
        style={distributionStyles['3']}
        title={distributionTitles['3']}></div>
      <div
        className={styles.distributionPercent}
        style={distributionStyles['4']}
        title={distributionTitles['4']}></div>
      <div
        className={styles.distributionPercent}
        style={distributionStyles['5']}
        title={distributionTitles['5']}></div>
      <div
        className={styles.distributionPercent}
        style={distributionStyles['6']}
        title={distributionTitles['6']}></div>
    </div>
  </li>;
};

export default WordComponent;
