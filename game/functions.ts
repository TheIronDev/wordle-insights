import {initializeApp, applicationDefault} from 'firebase-admin/app';
import admin from 'firebase-admin';
import {getFirestore} from 'firebase-admin/firestore';
import {https, firestore, auth} from 'firebase-functions';
import {createCompletedGame, createGame, createProfile} from './create.js';
import {reduceGame} from './reduceGame.js';
import {Game} from './types';

initializeApp({
  credential: applicationDefault(),
  databaseURL: 'https://wordle-insights-default-rtdb.firebaseio.com',
});
const db = getFirestore();

export const onUserCreated = auth.user().onCreate((user, context) => {
  const newProfile = createProfile(user, admin.firestore.Timestamp.now());
  db.collection('profiles').doc(user.uid).set(newProfile);

  const newGame = createGame('lowly', admin.firestore.Timestamp.now());
  db.collection('games').doc(user.uid).set(newGame);
});

export const gameAttemptTest = https.onRequest((req, res) => {
  const newGame = createGame('lowly', admin.firestore.Timestamp.now());
  db.collection('games').add(newGame);
  res.json(newGame);
});

export const gameAttempt = firestore.document('games/{uid}')
    .onUpdate((change, context) => {
      const updatedGame = change.after.data() as Game;
      const reducedGame = reduceGame(updatedGame as Game);

      if (reducedGame.isNewGameRequested) {
        change.after.ref.update(
            createGame('hello', admin.firestore.Timestamp.now()));
        return;
      }

      if (updatedGame.isComplete && reducedGame.isComplete) {
        const uid = change.after.id;
        db.collection('completedGames')
            .add(createCompletedGame(
                reducedGame,
                uid,
                admin.firestore.Timestamp.now()));
        return;
      }

      if (updatedGame.attempt.isChecking) {
        change.after.ref.update(reducedGame);
        return;
      }
    });
