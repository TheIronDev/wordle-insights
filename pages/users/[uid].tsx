import React from 'react';
import type {NextPage} from 'next';
import styles from '../../styles/Words.module.css';
import {User, Word} from '../../components/types';
import {getUsersWordStats, getUserWordStats} from '../../data';
import UserListComponent from '../../components/UserList';
import CompletedGamesListComponent from "../../components/CompletedGamesList";

type UserPageProps = {
  user: User
}

const UserPage: NextPage<UserPageProps> = ({user}: { user: User }) => {
  return <div className={styles.container}>
    <h1>User Page</h1>
    <sub>TODO</sub>
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
