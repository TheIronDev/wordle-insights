import React from 'react';
import type {NextPage} from 'next';
import styles from '../styles/About.module.css';

type AboutPageProps = {}

const AboutPage: NextPage<AboutPageProps> = () => {
  return <div className={styles.container}>
    <h1>About Word Insights</h1>
    <div className={styles.section}>
      {/* eslint-disable-next-line max-len */}
      <p>This is a user-driven wordle-like clone that records and openly displays data.</p>
      <div><a href="https://github.com/TheIronDev/wordle-insights">Github</a></div>
      <div><a href="https://github.com/TheIronDev/wordle-insights/issues/new">File an issue?</a></div>
    </div>
    <div>
      <div className={styles.section}>
        <h2>Frontend</h2>
        {/* eslint-disable-next-line max-len */}
        <p>The frontend is served by a Firebase Cloud Function that exposes a NextJs app.</p>
        <div>
          <img className={styles.builtWith} src="/built_with_firebase.png"/>
          <img className={styles.builtWith} src="/next_js_logo.svg"/>
        </div>

      </div>

      <div className={styles.section}>
        <h2>Backend</h2>
        {/* eslint-disable-next-line max-len */}
        <p>The backend is handled by a Firebase Cloud Function that reacts to mutations on games.</p>
        <div>
          <img className={styles.builtWith} src="/built_with_firebase.png"/>
        </div>

      </div>

    </div>
    {/* eslint-disable-next-line max-len */}
    <p>This has no affiliation with the <a href="https://www.nytimes.com/games/wordle/index.html">New York Times Wordle game</a>.</p>
  </div>;
};

export default AboutPage;
