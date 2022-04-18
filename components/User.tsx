import React, {FunctionComponent} from 'react';
import {User} from './types';
import styles from '../styles/User.module.css';
import Link from 'next/link';
import WinDistributionChart from './WinDistributionChart';

type WordProp = {
  user: User
}

const UserComponent: FunctionComponent<WordProp> = ({user}) => {
  const percent = user.wins ?
    (user.wins / (user.wins + user.losses) * 100).toFixed(2) :
    0;

  return <li key={user.id} className={styles.wordRow}>
    <Link href={'/users/' + user.id}>
      <div className={styles.profileInfo}>
        <span className="material-icons">account_circle</span>
        <a className={styles.displayName}>
          {user?.displayName || ''}
        </a>
      </div>
    </Link>
    <div className={styles.percent}>
      {percent}% <sub>({user.wins}/{user.losses})</sub>
    </div>

    <WinDistributionChart {...user} />
  </li>;
};

export default UserComponent;
