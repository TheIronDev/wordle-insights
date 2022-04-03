const nextServer = require('./nextServer');
const {gameAttempt, gameAttemptTest} = require('./game/functions');

// Functions wired up to start nextjs server
exports.nextServer = nextServer;

// Functions mapping game functionality
exports.gameAttempt = gameAttempt;
exports.gameAttemptTest = gameAttemptTest;
