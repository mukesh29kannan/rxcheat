import EncryptedTimeClient from './EncryptedTimeClient';
import crypto from 'crypto';
import { deflateSync} from 'zlib';


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
  const input = `${encryptedData}_*_${iv.toString('hex')}`;
  return deflateSync(input).toString('base64');
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
  const encryptedData= encryptServer(textToEncrypt);

  return <EncryptedTimeClient keyValue={encryptedData} referer={referer}/>;
}
