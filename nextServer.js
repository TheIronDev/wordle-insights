import { https } from 'firebase-functions';
import next from 'next';


const dev = process.env.NODE_ENV !== 'production';
const conf = { distDir: '.next' };

// NextJs Server
const server = next({dev, conf,});
const nextjsHandle = server.getRequestHandler();

export const nextServer = https.onRequest((req, res) => {
  return server.prepare().then(() => nextjsHandle(req, res));
});
