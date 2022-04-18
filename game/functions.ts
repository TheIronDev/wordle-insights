import {initializeApp, applicationDefault} from 'firebase-admin/app';
import admin from 'firebase-admin';
import {getFirestore} from 'firebase-admin/firestore';
import {https, firestore, auth} from 'firebase-functions';
import {createCompletedGame, createGame, createProfile} from './create.js';
import {reduceGame} from './reduceGame.js';
import {Game} from './types';
import {dictionary} from '../dictionary/frequent_5.js';

initializeApp({
  credential: applicationDefault(),
  databaseURL: 'https://wordle-insights-default-rtdb.firebaseio.com',
});
const db = getFirestore();

const getWordsCompletedByOtherUsers =
  async (uid: string, currentUserWords: string[]): Promise<string[]> => {
    const snapshot = await db
        .collection('completedGames')
        .where('uid', '!=', uid)
        .get();

    if (snapshot.empty) {
      return [];
    }

    const words = snapshot.docs.map((doc) => doc.data().word);
    const wordSet = new Set(words);

    // Remove any words the user already attempted
    currentUserWords.forEach((word) => wordSet.delete(word));

    return Array.from(wordSet);
  };

const getWordsCompletedByUser =
  async (uid: string): Promise<string[]> => {
    const snapshot = await db
        .collection('completedGames')
        .where('uid', '==', uid)
        .get();

    if (snapshot.empty) {
      return [];
    }

    const words = snapshot.docs.map((doc) => doc.data().word);
    const wordSet = new Set(words);

    return Array.from(wordSet);
  };

const getWordsFromDictionary = () => dictionary;

const getNewWordForUser = async (uid:string) => {
  const userWords = await getWordsCompletedByUser(uid);
  const otherUserWords = await getWordsCompletedByOtherUsers(uid, userWords);
  if (otherUserWords.length) {
    return otherUserWords[0];
  }
  const validWords = getWordsFromDictionary()
      .filter((word) => !userWords.includes(word));
  const index = ~~(Math.random() * validWords.length);

  return validWords[index];
};

export const onUserCreated = auth.user().onCreate((user, context) => {
  const newProfile = createProfile(user, admin.firestore.Timestamp.now());
  db.collection('profiles').doc(user.uid).set(newProfile);

  getNewWordForUser(user.uid).then((newWord) => {
    const newGame = createGame(newWord, admin.firestore.Timestamp.now());
    db.collection('games').doc(user.uid).set(newGame);
  });
});

export const gameAttemptTest = https.onRequest((req, res) => {
  // no-op
});

export const gameAttempt = firestore.document('games/{uid}')
    .onUpdate((change, context) => {
      const updatedGame = change.after.data() as Game;
      const reducedGame = reduceGame(updatedGame as Game);

      if (reducedGame.isNewGameRequested) {
        const uid = change.after.id;
        return getNewWordForUser(uid)
            .then((newWord) => {
              change.after.ref.update(
                  createGame(newWord, admin.firestore.Timestamp.now()));
            });
        return;
      }

      if (updatedGame?.isComplete && reducedGame?.isComplete) {
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
