const { https } = require('firebase-functions')
const { default: next } = require('next');

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

const dev = process.env.NODE_ENV !== 'production';
const conf = { distDir: '.next' };

// NextJs Server
const server = next({dev, conf,});
const nextjsHandle = server.getRequestHandler();

exports.nextServer = https.onRequest((req, res) => {
  return server.prepare().then(() => nextjsHandle(req, res));
});