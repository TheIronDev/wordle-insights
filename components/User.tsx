import React, {FunctionComponent} from 'react';
import {User} from './types';
import styles from '../styles/User.module.css';
import Link from 'next/link';
import WinDistributionChart from "./WinDistributionChart";

type WordProp = {
  user: User
}

const UserComponent: FunctionComponent<WordProp> = ({user}) => {
  const percent = user.wins ?
    (user.wins / (user.wins + user.losses) * 100).toFixed(2) :
    0;
  const max = Math.max(
      user.wins_1_turn,
      user.wins_2_turn,
      user.wins_3_turn,
      user.wins_4_turn,
      user.wins_5_turn,
      user.wins_6_turn,
  ) || 1;
  const distributionStyles = {
    1: {width: (user.wins_1_turn / max) * 100 + '%'},
    2: {width: (user.wins_2_turn / max) * 100 + '%'},
    3: {width: (user.wins_3_turn / max) * 100 + '%'},
    4: {width: (user.wins_4_turn / max) * 100 + '%'},
    5: {width: (user.wins_5_turn / max) * 100 + '%'},
    6: {width: (user.wins_6_turn / max) * 100 + '%'},
  };
  const distributionTitles = {
    1: user.wins_1_turn + ' wins',
    2: user.wins_2_turn + ' wins',
    3: user.wins_3_turn + ' wins',
    4: user.wins_4_turn + ' wins',
    5: user.wins_5_turn + ' wins',
    6: user.wins_6_turn + ' wins',
  };

  return <li key={user.id} className={styles.wordRow}>
    <Link href={'/users/' + user.id}>
      <a className={styles.word}>
        {user.displayName}
      </a>
    </Link>
    <div className={styles.percent}>
      {percent}% <sub>({user.wins}/{user.losses})</sub>
    </div>

    <WinDistributionChart {...user} />
  </li>;
};

export default UserComponent;
