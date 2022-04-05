import React from 'react';
import {useState} from 'react';
import type {NextPage} from 'next';
import Head from 'next/head';
import GameComponent from '../components/Game';
import styles from '../styles/Home.module.css';
import {signInWithPopup, signOut, onAuthStateChanged} from 'firebase/auth';
import {auth, googleAuthProvider} from '../firebase';


type User = {
    uid: string
    displayName: string
    isLoggedIn: boolean
}

function getUserAuthNavBar(currentUser:User) {
  if (currentUser.isLoggedIn) {
    return (
      <div>
        {currentUser.displayName}
        <button onClick={() => signOut(auth)}>Login Out</button>
      </div>
    );
  }
  return (

    <div>
      <button onClick={() => signInWithPopup(auth, googleAuthProvider)}>
        Login with Google
      </button>
    </div>
  );
}

const Home: NextPage = (props) => {
  const [currentUser, setCurrentUser] = useState({
    displayName: '',
    isLoggedIn: false,
  } as User);
  onAuthStateChanged(auth, (user) => {
    setCurrentUser({
      displayName: user?.displayName || '',
      isLoggedIn: !!user,
      uid: user?.uid,
    } as User);
  });

  const userAuthNavBarSection = getUserAuthNavBar(currentUser);
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
        <meta name="viewport" content={viewportMetadata} />
      </Head>

      <nav>
        <h1 className={styles.title}>
          Worldle Insights
        </h1>
        <div>
          {userAuthNavBarSection}
        </div>
      </nav>

      <main className={styles.main}>
        {mainContent}
      </main>
    </div>
  );
};

export default Home;
