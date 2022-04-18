import React, {FunctionComponent, useState} from 'react';
import Link from 'next/link';
import styles from '../styles/Navbar.module.css';
import {doc, getDoc, setDoc} from 'firebase/firestore';
import {auth, db, googleAuthProvider} from '../firebase';
import {useDocumentData} from 'react-firebase-hooks/firestore';
import {signInWithPopup, signOut} from 'firebase/auth';
import {useRouter} from 'next/router';


type Profile = {
  displayName: string
  userName: string
}

type NavbarAuthProps = {
  uid: string,
  isLoggedIn: boolean
}

const NavbarAuthComponent: FunctionComponent<NavbarAuthProps> =
  ({uid = '', isLoggedIn = false}) => {
    if (!isLoggedIn || !uid) {
      return (
        <div className={styles.profile}>
          <button
            onClick={() => signInWithPopup(auth, googleAuthProvider)}
            className={styles.logout}>
            <span className="material-icons">login</span>
          </button>
        </div>
      );
    }

    const profileRef = doc(db, 'profiles', uid);
    const [profileDocumentData] = useDocumentData(profileRef);
    let profileData = profileDocumentData as Profile;

    const [currentUser, setCurrentUser] = useState({
      displayName: '',
    });
    getDoc(profileRef).then((doc) => {
      profileData = doc.data() as Profile;
      setCurrentUser({
        displayName: profileData?.displayName || '',
      });
    });


    let debounce: number;
    const onProfileNameChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
      const value = ev.target.value;
      setCurrentUser({
        displayName: value,
      });

      if (debounce) window.clearTimeout(debounce);
      debounce = window.setTimeout(() => {
        setDoc(
            profileRef,
            {...profileData, displayName: value});
      }, 100);
    };

    return <div className={styles.profile}>

      <Link href={'/users/' + uid}>
        <span className="material-icons btn">person</span>
      </Link>
      <div className={styles.displayName}>
        <input
          id="displayname"
          maxLength={10}
          value={currentUser?.displayName}
          onChange={onProfileNameChange} />
        <label className="material-icons" htmlFor="displayname">edit</label>
      </div>
      <button onClick={() => signOut(auth)} className={styles.logout}>
        <span className="material-icons">logout</span>
      </button>
    </div>;
  };

type NavbarProps = {
  uid: string
  isLoggedIn: boolean
}
const NavbarComponent: FunctionComponent<NavbarProps> = ({uid, isLoggedIn}) => {
  const router = useRouter();

  return (
    <nav className={styles.container}>
      <div className={styles.leftContents}>
        <Link href="/">
          <h1 className={[styles.title, styles.btnText].join(' ')}>
            Wordle Insights
          </h1>
        </Link>
        <Link href="/">
          <div className={[
            styles.btn,
            'mobileOnly',
            router.pathname === '/' ? styles.activeBtn : ''].join(' ')}>
            <span className={'material-icons'}>
            home
            </span>
          </div>
        </Link>
        <Link href="/words">
          <div className={[
            styles.btn,
            router.pathname === '/words' ? styles.activeBtn : ''].join(' ')}>
            <span className={'material-icons'}>
            auto_graph
            </span>
            <span className={styles.btnText}>Word Data</span>
          </div>
        </Link>
        <Link href="/users">
          <div className={[
            styles.btn,
            router.pathname === '/users' ? styles.activeBtn : ''].join(' ')}>
            <span className={'material-icons'}>
            leaderboard
            </span>
            <span className={styles.btnText}>Leaderboard</span>
          </div>
        </Link>
        <Link href="/about">
          <div className={[
            styles.btn,
            router.pathname === '/about' ? styles.activeBtn : ''].join(' ')}>
            <span className={'material-icons'}>
            info
            </span>
            <span className={styles.btnText}>About</span>
          </div>
        </Link>
      </div>
      <NavbarAuthComponent isLoggedIn={isLoggedIn || false} uid={uid || ''}/>
    </nav>
  );
};

export default NavbarComponent;
