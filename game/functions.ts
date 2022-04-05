import {initializeApp, applicationDefault} from 'firebase-admin/app';
import admin from 'firebase-admin';
import {getFirestore} from 'firebase-admin/firestore';
import {https, firestore} from 'firebase-functions';
import {createGame} from './create.js';
import {reduceGame} from './reduceGame.js';
import {Game} from './types';

initializeApp({
  credential: applicationDefault(),
  databaseURL: 'https://wordle-insights-default-rtdb.firebaseio.com',
});
const db = getFirestore();

export const gameAttemptTest = https.onRequest((req, res) => {
  const newGame = createGame('lowly', admin.firestore.Timestamp.now());
  db.collection('games').add(newGame);
  res.json(newGame);
});

export const gameAttempt = firestore.document('games/{uid}')
    .onUpdate((change, context) => {
      const updatedGame = change.after.data();
      const reducedGame = reduceGame(updatedGame as Game);
    });
