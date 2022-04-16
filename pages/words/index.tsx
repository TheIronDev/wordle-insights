import React, {FunctionComponent} from 'react';
import type {NextPage} from 'next';
import {db} from '../../firebase';
import {collection, getDocs} from 'firebase/firestore';
import styles from '../../styles/Words.module.css';


type Word = {
  id: string;
  wins: number
  losses: number
  wins_1_turn: number;
  wins_2_turn: number;
  wins_3_turn: number;
  wins_4_turn: number;
  wins_5_turn: number;
  wins_6_turn: number;
}

type CompletedGame = {
  attemptCount: number
  isWon: boolean
  word: string
}

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

type WordPageProps = {
  words: Word[]
}

const WordsPage: NextPage<WordPageProps> = ({words}: { words: Word[] }) => {
  return <div className={styles.container}>
    <h1>Word Insights</h1>
    <sub>Most won to least won</sub>
    <ul>
      {words.map((word: Word) => <WordComponent key={word.id} word={word}/>)}

    </ul>
  </div>;
};

const createWord = (word: string): Word => ({
  id: word,
  wins: 0,
  losses: 0,
  wins_1_turn: 0,
  wins_2_turn: 0,
  wins_3_turn: 0,
  wins_4_turn: 0,
  wins_5_turn: 0,
  wins_6_turn: 0,
});

// This gets called on every request
export async function getServerSideProps() {
  const gamesSnapshot = await getDocs(collection(db, 'completedGames'));
  const wordsMap: Record<string, Word> = {};

  gamesSnapshot.forEach((doc) => {
    const completedGame = doc.data();
    const {word, attemptCount, isWon} = completedGame as CompletedGame;
    if (!word) return;
    if (!wordsMap[word]) {
      wordsMap[word] = createWord(word);
    }
    const wordData = wordsMap[word];
    if (isWon) {
      wordData.wins++;
      if (attemptCount === 1) wordData.wins_1_turn++;
      if (attemptCount === 2) wordData.wins_2_turn++;
      if (attemptCount === 3) wordData.wins_3_turn++;
      if (attemptCount === 4) wordData.wins_4_turn++;
      if (attemptCount === 5) wordData.wins_5_turn++;
      if (attemptCount === 6) wordData.wins_6_turn++;
    } else {
      wordData.losses++;
    }
    wordsMap[word] = wordData;
  });

  const words = Object.values(wordsMap)
      .sort((a, b) => {
        return b.wins - a.wins;
      });

  // Pass data to the page via props
  return {props: {words}};
}

export default WordsPage;
