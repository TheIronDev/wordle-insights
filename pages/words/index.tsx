import React from 'react';
import type {NextPage} from 'next';
import styles from '../../styles/Words.module.css';
import WordListComponent from '../../components/WordList';
import {Word} from '../../components/types';
import {getWords} from '../../data';

type WordPageProps = {
  words: Word[]
}

const WordsPage: NextPage<WordPageProps> = ({words}: { words: Word[] }) => {
  return <div className={styles.container}>
    <h1>Word Insights</h1>
    <sub>Most won to least won</sub>
    <WordListComponent words={words} />
  </div>;
};

// This gets called on every request
export async function getServerSideProps() {
  const words = await getWords();

  // Pass data to the page via props
  return {props: {words}};
}

export default WordsPage;
