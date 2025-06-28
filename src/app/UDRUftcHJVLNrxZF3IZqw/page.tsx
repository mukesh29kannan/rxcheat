import EncryptedTimeClient from './EncryptedTimeClient';
import crypto from 'crypto';
import { deflateSync} from 'zlib';

function encryptServer(text) {
  const algorithm = 'aes-256-cbc';
  const secret = "your-secret-key-here"; // Change this or put in env

  const rawKey = crypto.createHash('sha256').update(String(secret)).digest();
  const key = crypto.createSecretKey(rawKey);
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  const combined = `${encrypted}_*_${iv.toString('hex')}`;
  const compressed = deflateSync(combined).toString('base64');

  return `rxcheat${compressed}`;
}

// Example usage
// const expiryDate = new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString();
// const encryptedKey = encryptServer(expiryDate);
// console.log(encryptedKey);

export default async function EncryptedTimePage({ searchParams }: { searchParams: any }) {
  const referer = searchParams?.referer || ''; // fallback if needed

  // Optional referer check (mock logic)
  // if (!referer || !referer.includes("yourdomain.com")) {
  //   return <EncryptedTimeClient keyValue="" />;
  // }

  // This runs on server side
 const expiryDate = new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString();
 const encryptedData= encryptServer(expiryDate);

  return <EncryptedTimeClient keyValue={encryptedData} referer={referer}/>;
}
