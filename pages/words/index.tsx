import React from 'react';
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

const WordsPage: NextPage = ({words}: {words: Word[]}) => {

  return <ul className={styles.container}>
    {words.map((word: Word) => {
      const percent = word.wins ?
        (word.wins + word.losses) / word.wins * 100 :
        0;
      return <li key={word.id} className={styles.wordRow}>
        <div className={styles.word}>
          {word.id}
        </div>
        <div className={styles.percent}>
          {percent}% ({word.wins}/{word.losses})
        </div>
        <div className={styles.distribution}>
          {word.wins_1_turn},
          {word.wins_2_turn},
          {word.wins_3_turn},
          {word.wins_4_turn},
          {word.wins_5_turn},
          {word.wins_6_turn}
        </div>
      </li>;
    })
    }

  </ul>;
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
