import React from 'react';
import type {NextPage} from 'next';
import styles from '../../styles/User.module.css';
import {User} from '../../components/types';
import {getUserWordStats} from '../../data';
import CompletedGamesListComponent from '../../components/CompletedGamesList';
import WinDistributionChart from '../../components/WinDistributionChart';

type UserPageProps = {
  user: User
}

const UserPage: NextPage<UserPageProps> = ({user}: { user: User }) => {
  return <div className={styles.container}>
    <h1>{user.displayName}</h1>
    <div className={styles.quickStats}>
      <div className={styles.quickStatsText}>
        <div>Wins: {user.wins}</div>
        <div>Losses: {user.losses}</div>
        <div>Total: {user.total}</div>
      </div>
      <div>
        <WinDistributionChart {...user} />
      </div>
    </div>
    <CompletedGamesListComponent games={user.games || []} />
  </div>;
};

// This gets called on every request
export async function getServerSideProps({params}: {params:any}) {
  const user = await getUserWordStats(params.uid);

  // Pass data to the page via props
  return {props: {user}};
}

export default UserPage;
