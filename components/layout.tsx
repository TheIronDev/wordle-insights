import React, {FunctionComponent} from 'react';
import {useState} from 'react';
import Head from 'next/head';
import {onAuthStateChanged} from 'firebase/auth';
import {auth} from '../firebase';
import NavbarComponent from '../components/Navbar';


type User = {
  uid: string
  displayName: string
  isLoggedIn: boolean
}

const LayoutComponent: FunctionComponent = ({children}) => {
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


  return (
    <div>
      <Head>
        <title>World Insights</title>
      </Head>

      <NavbarComponent
        uid={currentUser.uid || ''}
        isLoggedIn={currentUser.isLoggedIn || false} />

      <main>
        {children}
      </main>
    </div>
  );
};

export default LayoutComponent;
