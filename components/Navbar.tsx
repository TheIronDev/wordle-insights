import React, {FunctionComponent} from 'react';
import Link from 'next/link';
import styles from '../styles/Navbar.module.css';
import {doc} from 'firebase/firestore';
import {auth, db, googleAuthProvider} from '../firebase';
import {useDocumentData} from 'react-firebase-hooks/firestore';
import {signInWithPopup, signOut} from 'firebase/auth';
import {useRouter} from 'next/router';


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

      <Link href={'/users/' + uid}>
        <img className={styles.profilePic} src={profile?.photoUrl}/>
      </Link>
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
  const router = useRouter();

  return (
    <nav className={styles.container}>
      <div className={styles.leftContents}>
        <h1 className={styles.title}>
          Wordle Insights
        </h1>
        <Link href="/">
          <div className={[
            styles.btn,
            router.pathname === '/' ? styles.activeBtn : ''].join(' ')}>
            <span className={['material-icons'].join(' ')}>
            videogame_asset
            </span>
            <span className={styles.btnText}>Home / Game</span>
          </div>
        </Link>
        <Link href="/words">
          <div className={[
            styles.btn,
            router.pathname === '/words' ? styles.activeBtn : ''].join(' ')}>
            <span className={['material-icons'].join(' ')}>
            auto_graph
            </span>
            <span className={styles.btnText}>Word Data</span>
          </div>
        </Link>
        <Link href="/users">
          <div className={[
            styles.btn,
            router.pathname === '/users' ? styles.activeBtn : ''].join(' ')}>
            <span className={['material-icons'].join(' ')}>
            leaderboard
            </span>
            <span className={styles.btnText}>Leaderboard</span>
          </div>
        </Link>
      </div>
      <NavbarAuthComponent isLoggedIn={isLoggedIn || false} uid={uid || ''}/>
    </nav>
  );
};

export default NavbarComponent;
