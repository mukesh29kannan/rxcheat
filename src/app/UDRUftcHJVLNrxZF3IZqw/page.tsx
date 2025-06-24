import EncryptedTimeClient from './EncryptedTimeClient';
import crypto from 'crypto';

function encryptServer(text:string) {

  const algorithm = 'aes-256-cbc';

  const rawKey:any = crypto.createHash('sha256')
    .update(String(process.env.SECRET_KEY))
    .digest();

  const key = crypto.createSecretKey(rawKey);
  const iv = crypto.randomBytes(16);

  const cipher = crypto?.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return {
    encryptedData: encrypted,
    iv: iv.toString('hex')
  };
}

export default async function EncryptedTimePage({ searchParams }: { searchParams: any }) {
  const referer = searchParams?.referer || ''; // fallback if needed

  // Optional referer check (mock logic)
  // if (!referer || !referer.includes("yourdomain.com")) {
  //   return <EncryptedTimeClient keyValue="" />;
  // }

  // This runs on server side
  const twoHoursLater = new Date(Date.now() + 2 * 60 * 60 * 1000);
  const textToEncrypt = twoHoursLater.toISOString();
  console.log({twoHoursLater,textToEncrypt})
  const { encryptedData, iv } = encryptServer(textToEncrypt);
  console.log({ encryptedData, iv })
  const key = `${encryptedData}_*_${iv}`;
  console.log({key})
  return <EncryptedTimeClient key={key} referer={referer}/>;
}
