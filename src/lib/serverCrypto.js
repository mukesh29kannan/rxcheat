import crypto from 'crypto';

const algorithm = 'aes-256-cbc';

const rawKey = crypto.createHash('sha256')
  .update(String(process.env.SECRET_KEY))
  .digest();

const key = crypto.createSecretKey(rawKey);

export function encryptServer(text) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return {
    encryptedData: encrypted,
    iv: iv.toString('hex')
  };
}

export function decryptServer(encryptedData, ivHex) {
  const iv = Buffer.from(ivHex, 'hex');
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}
