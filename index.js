import {nextServer} from './nextServer.js';
import {gameAttempt, gameAttemptTest} from './out/game/functions.js';

// Functions wired up to start nextjs server
export const nextServerFunction = nextServer;

// Functions mapping game functionality
export const gameAttemptFunction = gameAttempt;
export const gameAttemptTestFunction = gameAttemptTest;
