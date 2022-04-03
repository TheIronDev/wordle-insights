const {initializeApp, applicationDefault} = require('firebase-admin/app');
const {getFirestore} = require('firebase-admin/firestore');
const {https, firestore} = require('firebase-functions');
const createGame = require('./createGame');

initializeApp({
  credential: applicationDefault(),
  databaseURL: 'https://wordle-insights-default-rtdb.firebaseio.com',
});
const db = getFirestore();

exports.gameAttemptTest = https.onRequest((req, res) => {
  const newGame = createGame('lowly', 0);
  db.collection('games').add(newGame);
  res.json(newGame);
});

exports.gameAttempt = firestore.document('games/{uid}')
    .onUpdate((change, context) => {
      const update = change.after.data();
      if (update.isNewGameRequested) {
        // TODO - find a word the user hasn't attempted
        // TODO - create a new game, and overwrite the existing game
        console.log('isNewGameRequested');
      } else if (update.attempt && update.attempt.isChecking) {
        // TODO - check if the attempt matches
        // TODO - Update hints, attempts, and keyboardHints
        // TODO - If won - also update the archive of completed games
        // Flip `isChecking` to false
        console.log('isChecking current attempt');
      }
      console.log(update);
    });
