import React, {FunctionComponent} from 'react';
import {Word} from './types';
import styles from '../styles/Words.module.css';
import WinDistributionChart from './WinDistributionChart';
import Link from 'next/link';

type WordProp = {
  word: Word
}

const WordComponent: FunctionComponent<WordProp> = ({word}) => {
  const percent = word.wins ?
    (word.wins / (word.wins + word.losses) * 100).toFixed(2) :
    0;
  return <li key={word.id} className={styles.wordRow}>
    <Link href={'/words/' + word.id}>
      <a className={styles.word}>
        {word.id}
      </a>
    </Link>
    <div className={styles.percent}>
      {percent}% <sub>({word.wins}/{word.losses})</sub>
    </div>
    <WinDistributionChart {...word} />
  </li>;
};

export default WordComponent;
