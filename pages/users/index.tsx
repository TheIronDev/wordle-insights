import React from 'react';
import type {NextPage} from 'next';
import styles from '../../styles/Words.module.css';
import {User, Word} from '../../components/types';
import {getUserWordStats} from '../../data';
import UserListComponent from '../../components/UserList';

type WordPageProps = {
  words: Word[]
}

const UsersPage: NextPage<WordPageProps> = ({users}: { users: User[] }) => {
  return <div className={styles.container}>
    <h1>Leaderboard</h1>
    <sub>Most wins to least wins</sub>
    <UserListComponent users={users} />
  </div>;
};

// This gets called on every request
export async function getServerSideProps() {
  const users = await getUserWordStats();

  // Pass data to the page via props
  return {props: {users}};
}

export default UsersPage;
