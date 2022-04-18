import {collection, doc, getDoc, getDocs} from 'firebase/firestore';
import {db} from '../firebase';
import {CompletedGame, Word, User} from '../components/types';
import {Profile} from '../game/types';

export const createWord = (word: string): Word => ({
  id: word,
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
export const createUser = (uid: string): User => ({
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

    completedGame.created = completedGame?.created?.seconds * 1000;
    completedGame.completed = completedGame?.completed?.seconds * 1000;
    wordData.games?.push(<CompletedGame>completedGame);
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

  const profilesSnapshot = await getDocs(collection(db, 'profiles'));
  const profileMap: Record<string, string> = {};
  profilesSnapshot.forEach((doc) => {
    const profile = doc.data() as Profile;
    if (profile.displayName != null) {
      profileMap[doc.id] = profile.displayName;
    }
  });

  gamesSnapshot.forEach((doc) => {
    const completedGame = doc.data();
    const {uid, attemptCount, isWon} = completedGame as CompletedGame;
    if (!uid) return;
    if (!usersMap[uid]) {
      usersMap[uid] = createUser(uid);
    }
    const userData = usersMap[uid];
    userData.total++;
    if (isWon) {
      userData.wins++;
      if (attemptCount === 1) userData.wins_1_turn++;
      if (attemptCount === 2) userData.wins_2_turn++;
      if (attemptCount === 3) userData.wins_3_turn++;
      if (attemptCount === 4) userData.wins_4_turn++;
      if (attemptCount === 5) userData.wins_5_turn++;
      if (attemptCount === 6) userData.wins_6_turn++;
    } else {
      userData.losses++;
    }
    usersMap[uid] = userData;
  });


  return Object.values(usersMap)
      .map((user) => {
        if (profileMap[user.id]) {
          user.displayName = profileMap[user.id];
        }
        return user;
      })
      .sort((a, b) => {
        return b.wins - a.wins;
      });
};


export const getWordStats = async (wordId:string) => {
  const gamesSnapshot = await getDocs(collection(db, 'completedGames'));
  const wordMap: Record<string, Word> = {};

  gamesSnapshot.forEach((doc) => {
    const completedGame = doc.data();
    const {word, attemptCount, isWon} = completedGame as CompletedGame;
    completedGame.id = doc.id;
    if (!word) return;
    if (word !== wordId) return;
    if (!wordMap?.[word]) {
      wordMap[word] = createWord(word);
    }
    const wordData = wordMap?.[word];
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

    // Not serializable
    completedGame.created = completedGame?.created?.seconds * 1000;
    completedGame.completed = completedGame?.completed?.seconds * 1000;
    wordData?.games?.push(<CompletedGame>completedGame);
    wordMap[word] = wordData;
  });

  return wordMap[wordId];
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
    completedGame.completed = completedGame?.completed?.seconds * 1000;
    user?.games?.push(<CompletedGame>completedGame);
    usersMap[uid] = user;
  });

  return usersMap[userId];
};

export const getUserProfile = async (userId:string) => {
  const profileRef = doc(db, 'profiles', userId);
  const profile = await getDoc(profileRef);
  const profileData = profile.data();

  if (profileData?.created) {
    profileData.created = profileData?.created?.seconds * 1000;
  }
  return profileData;
};
