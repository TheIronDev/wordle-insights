import crypto from 'crypto';

const algorithm = 'aes-256-cbc';
const encryptKey = crypto.randomBytes(32);
const encryptIv = crypto.randomBytes(16);
const password = 'supersecure';

/**
 * encrypt/decrypt functions are modified copies of:
 * https://www.geeksforgeeks.org/node-js-crypto-createdecipheriv-method/?ref=lbp
 */

// An encrypt function
export const encrypt = (text: string) => {
  const cipher =
    crypto.createCipher(algorithm, password);

  // Returning iv and encrypted data
  return {
    iv: encryptIv.toString('hex'),
    data: cipher.update(text, 'utf8', 'hex') + cipher.final('hex'),
  };
};

// A decrypt function
export const decrypt = (iv: string, data: string) => {
  const decipher =
    crypto.createDecipher(algorithm, password);
  return decipher.update(data, 'hex', 'utf8') + decipher.final('utf8');
};
