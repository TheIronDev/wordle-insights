const { https } = require('firebase-functions')
const { default: next } = require('next');


const dev = process.env.NODE_ENV !== 'production';
const conf = { distDir: '.next' };

// NextJs Server
const server = next({dev, conf,});
const nextjsHandle = server.getRequestHandler();
exports = https.onRequest((req, res) => {
  return server.prepare().then(() => nextjsHandle(req, res));
});
