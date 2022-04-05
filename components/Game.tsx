import React, {FunctionComponent} from 'react';
import BoardComponent from './Board';
import KeyboardComponent from './Keyboard';
import {Game, KeyboardHints, KeyboardKey, KeyboardKeyType} from './types';
import styles from '../styles/Game.module.css';
import {doc, DocumentData, DocumentReference, setDoc} from 'firebase/firestore';
import {db} from '../firebase';
import {useDocumentData} from 'react-firebase-hooks/firestore';


type GameProps = {
  uid: string
};

const onKeyClick = (
    keyboardKey: KeyboardKey,
    gameData: Game, gameRef: DocumentReference<DocumentData>) => {
  let attemptValue = gameData.attempt.value;
  const attempt = {...gameData.attempt};
  switch (keyboardKey.type) {
    case KeyboardKeyType.CHAR:
      attemptValue = attemptValue + keyboardKey.display;
      attempt.value = attemptValue;
      if (attemptValue.length <= 5) {
        setDoc(gameRef, Object.assign({}, gameData, {attempt}));
      }
      break;
    case KeyboardKeyType.DELETE:
      if (attemptValue) {
        attempt.value = attemptValue.slice(0, -1);
      }
      setDoc(gameRef, Object.assign({}, gameData, {attempt}));
      break;
    case KeyboardKeyType.SUBMIT:
      attempt.isChecking = true;

      setDoc(gameRef, Object.assign({}, gameData, {attempt}));
      break;
    case KeyboardKeyType.UNKNOWN:
    default:
  }
};


const GameComponent: FunctionComponent<GameProps> = ({uid}) => {
  const gameRef = doc(db, 'games', uid);
  const [game] = useDocumentData(gameRef);

  const keyboardCallback = (keyboardKey: KeyboardKey) => {
    onKeyClick(keyboardKey, game as Game, gameRef);
  };

  if (!game) {
    return (<div>Start a new game?</div>);
  }

  const onNewGameClick = () => {
    setDoc(gameRef, Object.assign({}, game, {isNewGameRequested: true}));
  };

  const newGameSection = game.isComplete ?
    <button onClick={() => onNewGameClick()}>Start a new game?</button> :
    <span></span>;

  return (
    <div className={styles.container}>
      <BoardComponent game={game as Game}/>
      {newGameSection}
      <KeyboardComponent
        keyboardCallback={keyboardCallback}
        keyboardHints={game.keyboardHints as KeyboardHints}/>
    </div>
  );
};

export default GameComponent;
