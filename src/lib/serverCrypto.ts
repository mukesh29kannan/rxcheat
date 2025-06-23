import crypto, { KeyObject } from 'crypto';

const algorithm = 'aes-256-cbc';

// Derive a 32-byte key from your secret
const rawKey:any = crypto.createHash('sha256')
  .update(String(process.env.SECRET_KEY))
  .digest();

const key: KeyObject = crypto.createSecretKey(rawKey);

export function encryptServer(text: string): { encryptedData: string; iv: string } {
  const iv = crypto.randomBytes(16); // Keep as Buffer
  const cipher = crypto.createCipheriv(algorithm, key, iv as Uint8Array); // Cast only here
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return {
    encryptedData: encrypted,
    iv: iv.toString('hex') // ✅ works because iv is a Buffer
  };
}

export function decryptServer(encryptedData: string, ivHex: string): string {
  const iv = Buffer.from(ivHex, 'hex'); // Buffer is fine here
  const decipher = crypto.createDecipheriv(algorithm, key, iv as Uint8Array);
  let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}
