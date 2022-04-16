import React, {FunctionComponent} from 'react';
import {Word} from './types';
import WordComponent from './Word';
import styles from '../styles/Words.module.css';

type WordListProps = {
    words: Word[]
};

const WordListComponent: FunctionComponent<WordListProps> = ({words}) => (
  <ul className={styles.container}>
    {words.map((word: Word) => <WordComponent key={word.id} word={word}/> )}
  </ul>
);

export default WordListComponent;
