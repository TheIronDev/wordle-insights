const {initializeApp, applicationDefault} = require('firebase-admin/app');
const {getFirestore} = require('firebase-admin/firestore');
const {https, firestore} = require('firebase-functions');
const {createGame} = require('./create');
const {reduceGame} = require('./reduceGame');

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
      const updatedGame = change.after.data();
      const reducedGame = reduceGame(updatedGame);
      console.log('Function UpdatedGame');
      console.table(updatedGame);

      console.log('Reduce UpdatedGame');
      console.table(reducedGame);
    });
