const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const encryptKey = crypto.randomBytes(32);
const encryptIv = crypto.randomBytes(16);

/**
 * encrypt/decrypt functions are modified copies of:
 * https://www.geeksforgeeks.org/node-js-crypto-createdecipheriv-method/?ref=lbp
 */

// An encrypt function
exports.encrypt = (text) => {
  // Creating Cipheriv with its parameter
  const cipher =
    crypto.createCipheriv(algorithm, Buffer.from(encryptKey), encryptIv);

  const encryptedText = cipher.update(text);
  const encryptedData = Buffer.concat([encryptedText, cipher.final()]);

  // Returning iv and encrypted data
  return {
    iv: encryptIv.toString('hex'),
    data: encryptedData.toString('hex'),
  };
};

// A decrypt function
exports.decrypt = (iv, data) => {
  const ivBuffer = Buffer.from(iv, 'hex');
  const encryptedText = Buffer.from(data, 'hex');

  const decipher =
    crypto.createDecipheriv(algorithm, Buffer.from(encryptKey), ivBuffer);

  const decrypted = decipher.update(encryptedText);
  const decryptedBuffer = Buffer.concat([decrypted, decipher.final()]);

  return decryptedBuffer.toString();
};
