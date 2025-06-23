import EncryptedTimeClient from './EncryptedTimeClient';
import { encryptServer } from '@/lib/serverCrypto';

export default async function EncryptedTimePage() {
  // This runs on server side
  const twoHoursLater = new Date(Date.now() + 2 * 60 * 60 * 1000);
  const textToEncrypt = twoHoursLater.toISOString();
  
  const { encryptedData, iv } = encryptServer(textToEncrypt);
  const key = `${encryptedData}_*_${iv}`;

  return <EncryptedTimeClient key={key} />;
}
