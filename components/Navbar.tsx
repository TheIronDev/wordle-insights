import React, {FunctionComponent} from 'react';
import Link from 'next/link';
import styles from '../styles/Navbar.module.css';
import {doc} from 'firebase/firestore';
import {auth, db, googleAuthProvider} from '../firebase';
import {useDocumentData} from 'react-firebase-hooks/firestore';
import {signInWithPopup, signOut} from 'firebase/auth';


type Profile = {
  displayName: string
  photoUrl: string
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
    const profile = profileDocumentData as Profile;

    return <div className={styles.profile}>
      <img className={styles.profilePic} src={profile?.photoUrl}/>
      <div className={styles.displayName}>
        {profile?.displayName}
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
  return (
    <nav className={styles.container}>
      <div className={styles.leftContents}>
        <h1 className={styles.title}>
        Worldle Insights
        </h1>
        <Link href="/">
          <div className={styles.btn}>
            <span className={['material-icons'].join(' ')}>
            videogame_asset
            </span>
            <span className={styles.btnText}>Home / Game</span>
          </div>
        </Link>
        <Link href="/words">
          <div className={styles.btn}>
            <span className={['material-icons'].join(' ')}>
            auto_graph
            </span>
            <span className={styles.btnText}>Word Data</span>

          </div>
        </Link>
      </div>
      <NavbarAuthComponent isLoggedIn={isLoggedIn || false} uid={uid || ''}/>
    </nav>
  );
};

export default NavbarComponent;
