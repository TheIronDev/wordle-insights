import React from 'react';
import type {NextPage} from 'next';
import styles from '../../styles/Words.module.css';
import {User, Profile, Word} from '../../components/types';
import {getUserProfile, getUserWordStats, getWordStats} from '../../data';
import CompletedGamesListComponent from '../../components/CompletedGamesList';
import WinDistributionChart from '../../components/WinDistributionChart';
import Link from 'next/link';

type WordPageProps = {
  word: Word
}

const UserPage: NextPage<WordPageProps> =
  ({word}: { word: Word }) => {
    const backButtonClassName =
    ['material-icons', 'btn', styles.backButton].join(' ');
    return <div className={styles.container}>
      <Link href="/words">
        <div className={backButtonClassName}>
          arrow_back
        </div>
      </Link>
      <h1 className={styles.word}>{word.id}</h1>
      <div className={styles.quickStats}>
        <div className={styles.quickStatsText}>
          <div>Wins: {word.wins}</div>
          <div>Losses: {word.losses}</div>
          <div>Total: {word.total}</div>
        </div>
        <div>
          <WinDistributionChart {...word} />
        </div>
      </div>
      <CompletedGamesListComponent games={word.games || []} />
    </div>;
  };

// This gets called on every request
export async function getServerSideProps({params}: {params:any}) {
  const word = await getWordStats(params.uid);

  // Pass data to the page via props
  return {props: {word}};
}

export default UserPage;
