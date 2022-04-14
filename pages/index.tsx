import React from 'react';
import {useState} from 'react';
import type {NextPage} from 'next';
import Head from 'next/head';
import GameComponent from '../components/Game';
import styles from '../styles/Home.module.css';
import {onAuthStateChanged} from 'firebase/auth';
import {auth, db, googleAuthProvider} from '../firebase';
import NavbarComponent from '../components/Navbar';


type User = {
    uid: string
    displayName: string
    isLoggedIn: boolean
}

const Home: NextPage = (props) => {
  const [currentUser, setCurrentUser] = useState({
    displayName: '',
    isLoggedIn: false,
    uid: '',
  } as User);
  onAuthStateChanged(auth, (user) => {
    if (currentUser.uid === user?.uid) return;
    setCurrentUser({
      displayName: user?.displayName || '',
      isLoggedIn: !!user,
      uid: user?.uid,
    } as User);
  });

  const mainContent = currentUser && currentUser.uid ?
    <GameComponent uid={currentUser.uid} /> :
    <div>Login required</div>;

  const viewportMetadata = [
    'width=device-width',
    'initial-scale=1.0',
    'maximum-scale=1.0',
    'user-scalable=0',
  ].join(', ');

  return (
    <div className={styles.container}>
      <Head>
        <title>World Insights</title>
        <meta
          name="description"
          content="Wordle Insights - Wordle with an emphasis on data" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet" />
        <meta name="viewport" content={viewportMetadata} />
      </Head>

      <NavbarComponent
        uid={currentUser.uid}
        isLoggedIn={currentUser.isLoggedIn} />

      <main className={styles.main}>
        {mainContent}
      </main>
    </div>
  );
};

export default Home;
