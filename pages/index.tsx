import React from 'react';
import {useState} from 'react';
import type {NextPage} from 'next';
import GameComponent from '../components/Game';
import {onAuthStateChanged, signInWithPopup} from 'firebase/auth';
import {auth, googleAuthProvider} from '../firebase';
import {getWords} from '../data';
import {Word} from '../components/types';
import WordList from '../components/WordList';
import styles from '../styles/Home.module.css';

type User = {
    uid: string
    displayName: string
    isLoggedIn: boolean
}

type HomePageProps = {
  words: Word[],
  currentUser: User
}

const Home: NextPage<HomePageProps> =
  ({words, currentUser}: { words: Word[], currentUser: User }) => {
    const [user, setUser] = useState(currentUser as User);
    onAuthStateChanged(auth, (authUser) => {
      if (user?.uid === authUser?.uid) return;
      setUser({
        displayName: authUser?.displayName || '',
        isLoggedIn: !!authUser,
        uid: authUser?.uid,
      } as User);
    });

    return user && user.uid ?
    <GameComponent uid={user.uid} /> :
      <div className={styles.container}>
        <h1>Wordle Word Data</h1>
        <div>User generated data</div>
        <sub>Play a few games to add more data</sub>
        <img
          className={styles.login}
          onClick={() => signInWithPopup(auth, googleAuthProvider)}
          src="/btn_google_signin_dark_normal_web.png"/>
        <WordList words={words} />
      </div>;
  };

export default Home;

export async function getServerSideProps() {
  const words = await getWords();
  const currentUser = auth.currentUser;

  // Pass data to the page via props
  return {props: {words, currentUser}};
}

