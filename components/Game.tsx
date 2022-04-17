import React, {FunctionComponent} from 'react';
import BoardComponent from './Board';
import KeyboardComponent from './Keyboard';
import {Game, KeyboardHints, KeyboardKey, KeyboardKeyType} from './types';
import styles from '../styles/Game.module.css';
import {doc, DocumentData, DocumentReference, setDoc} from 'firebase/firestore';
import {db} from '../firebase';
import {useDocumentData} from 'react-firebase-hooks/firestore';
import useEventListener from '@use-it/event-listener';


const getToastContent = (game: Game) => {
  if (game.attempt.isNotFoundInDictionary) {
    return <div className={styles.toast}>
      &quot;{game.attempt.value}&quot; is not a valid word
    </div>;
  }
  if (game.wordSolution) {
    return <div className={styles.toast}>
      &quot;{game.wordSolution}&quot;
    </div>;
  }

  return <div></div>;
};

type GameProps = {
  uid: string
};

const onKeyClick = (
    keyboardKey: KeyboardKey,
    gameData: Game, gameRef: DocumentReference<DocumentData>) => {
  if (gameData.isComplete) return;

  let attemptValue = gameData.attempt.value;
  const attempt = {...gameData.attempt};
  attempt.isError = false;
  attempt.isNotFoundInDictionary = false;
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
      if (attemptValue.length === 5) {
        attempt.isChecking = true;
        setDoc(gameRef, Object.assign({}, gameData, {attempt}));
      }
      break;
    case KeyboardKeyType.UNKNOWN:
    default:
  }
};


const GameComponent: FunctionComponent<GameProps> = ({uid}) => {
  const gameRef = doc(db, 'games', uid);
  const [gameDocumentData] = useDocumentData(gameRef);
  const game = gameDocumentData as Game;

  const keyboardClickCallback = (keyboardKey: KeyboardKey) => {
    if (game.isComplete) return;
    onKeyClick(keyboardKey, game as Game, gameRef);
  };

  const keyboardKeydownCallback = (ev: KeyboardEvent) => {
    if (game.isComplete) return;
    let keyboardKey;
    switch (ev.key) {
      case 'Enter':
        keyboardKey = {type: KeyboardKeyType.SUBMIT} as KeyboardKey;
        return onKeyClick(keyboardKey, game as Game, gameRef);
      case 'Backspace':
        keyboardKey = {type: KeyboardKeyType.DELETE} as KeyboardKey;
        return onKeyClick(keyboardKey, game as Game, gameRef);
      default:
        const validCharacters = 'abcdefghijklmnopqrstuvwxyz';
        if (!validCharacters.includes(ev.key)) return;
        keyboardKey =
          {type: KeyboardKeyType.CHAR, display: ev.key} as KeyboardKey;
        return onKeyClick(keyboardKey, game as Game, gameRef);
    }
  };

  useEventListener('keydown', keyboardKeydownCallback);

  if (!game) {
    return (<div></div>);
  }

  const onNewGameClick = () => {
    setDoc(gameRef, Object.assign({}, game, {isNewGameRequested: true}));
  };

  const newGameSection = game.isComplete ?
    <button
      className={styles.newGameButton}
      onClick={() => onNewGameClick()}>
      New Game
    </button> :
    <span></span>;

  const containerClass = game.attempt.isChecking ?
      [styles.container, styles.loading].join(' ') :
      styles.container;

  const toastContent = getToastContent(game);

  return (
    <div className={containerClass}>
      {toastContent}
      <BoardComponent game={game as Game}/>
      <div className={styles.newGameSection}>
        {newGameSection}
      </div>
      <KeyboardComponent
        keyboardCallback={keyboardClickCallback}
        keyboardHints={game.keyboardHints as KeyboardHints}/>
    </div>
  );
};

export default GameComponent;
