import {collection, getDocs} from 'firebase/firestore';
import {db} from '../firebase';
import {CompletedGame, Word, User} from '../components/types';

const createWord = (word: string): Word => ({
  id: word,
  wins: 0,
  losses: 0,
  wins_1_turn: 0,
  wins_2_turn: 0,
  wins_3_turn: 0,
  wins_4_turn: 0,
  wins_5_turn: 0,
  wins_6_turn: 0,
});

const createUser = (uid: string): User => ({
  displayName: 'Anonymous',
  id: uid,
  total: 0,
  wins: 0,
  losses: 0,
  games: [],
  wins_1_turn: 0,
  wins_2_turn: 0,
  wins_3_turn: 0,
  wins_4_turn: 0,
  wins_5_turn: 0,
  wins_6_turn: 0,
});

export const getWords = async () => {
  const gamesSnapshot = await getDocs(collection(db, 'completedGames'));
  const wordsMap: Record<string, Word> = {};

  gamesSnapshot.forEach((doc) => {
    const completedGame = doc.data();
    const {word, attemptCount, isWon} = completedGame as CompletedGame;
    if (!word) return;
    if (!wordsMap[word]) {
      wordsMap[word] = createWord(word);
    }
    const wordData = wordsMap[word];
    if (isWon) {
      wordData.wins++;
      if (attemptCount === 1) wordData.wins_1_turn++;
      if (attemptCount === 2) wordData.wins_2_turn++;
      if (attemptCount === 3) wordData.wins_3_turn++;
      if (attemptCount === 4) wordData.wins_4_turn++;
      if (attemptCount === 5) wordData.wins_5_turn++;
      if (attemptCount === 6) wordData.wins_6_turn++;
    } else {
      wordData.losses++;
    }
    wordsMap[word] = wordData;
  });

  return Object.values(wordsMap)
      .sort((a, b) => {
        return (b.wins - b.losses) - (a.wins - a.losses);
      });
};

export const getUsersWordStats = async () => {
  const gamesSnapshot = await getDocs(collection(db, 'completedGames'));
  const usersMap: Record<string, User> = {};

  gamesSnapshot.forEach((doc) => {
    const completedGame = doc.data();
    const {uid, attemptCount, isWon} = completedGame as CompletedGame;
    if (!uid) return;
    if (!usersMap[uid]) {
      usersMap[uid] = createUser(uid);
    }
    const wordData = usersMap[uid];
    wordData.total++;
    if (isWon) {
      wordData.wins++;
      if (attemptCount === 1) wordData.wins_1_turn++;
      if (attemptCount === 2) wordData.wins_2_turn++;
      if (attemptCount === 3) wordData.wins_3_turn++;
      if (attemptCount === 4) wordData.wins_4_turn++;
      if (attemptCount === 5) wordData.wins_5_turn++;
      if (attemptCount === 6) wordData.wins_6_turn++;
    } else {
      wordData.losses++;
    }
    usersMap[uid] = wordData;
  });

  return Object.values(usersMap)
      .sort((a, b) => {
        return b.wins - a.wins;
      });
};


export const getUserWordStats = async (userId:string) => {
  const gamesSnapshot = await getDocs(collection(db, 'completedGames'));
  const usersMap: Record<string, User> = {};

  gamesSnapshot.forEach((doc) => {
    const completedGame = doc.data();
    const {uid, attemptCount, isWon} = completedGame as CompletedGame;
    completedGame.id = doc.id;
    if (!uid) return;
    if (uid !== userId) return;
    if (!usersMap?.[uid]) {
      usersMap[uid] = createUser(uid);
    }
    const user = usersMap?.[uid];
    user.total++;
    if (isWon) {
      user.wins++;
      if (attemptCount === 1) user.wins_1_turn++;
      if (attemptCount === 2) user.wins_2_turn++;
      if (attemptCount === 3) user.wins_3_turn++;
      if (attemptCount === 4) user.wins_4_turn++;
      if (attemptCount === 5) user.wins_5_turn++;
      if (attemptCount === 6) user.wins_6_turn++;
    } else {
      user.losses++;
    }

    // Not serializable
    completedGame.created = completedGame?.created?.seconds * 1000;
    user?.games?.push(<CompletedGame>completedGame);
    usersMap[uid] = user;
  });

  return usersMap[userId];
};
