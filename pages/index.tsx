import React from 'react';
import {useState} from 'react';
import type {NextPage} from 'next';
import GameComponent from '../components/Game';
import {onAuthStateChanged} from 'firebase/auth';
import {auth} from '../firebase';

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

  return currentUser && currentUser.uid ?
    <GameComponent uid={currentUser.uid} /> :
    <div>Login required</div>;
};

export default Home;
