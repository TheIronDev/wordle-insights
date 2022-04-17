import React from 'react';
import type {NextPage} from 'next';
import styles from '../../styles/User.module.css';
import {User, Profile} from '../../components/types';
import {getUserProfile, getUserWordStats} from '../../data';
import CompletedGamesListComponent from '../../components/CompletedGamesList';
import WinDistributionChart from '../../components/WinDistributionChart';

type UserPageProps = {
  user: User,
  profile: Profile
}

const UserPage: NextPage<UserPageProps> = ({user, profile}: { user: User, profile: Profile }) => {
  return <div className={styles.container}>
    <h1>{profile.displayName}</h1>
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
  const profile = await getUserProfile(params.uid);

  // Pass data to the page via props
  return {props: {user, profile}};
}

export default UserPage;
