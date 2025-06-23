import { GetServerSideProps } from 'next';
import { encryptServer,decryptServer } from '@/lib/crypto';
import { Button, Card, Textarea } from '@nextui-org/react';
import { useEffect, useState } from 'react';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const referer = context.req.headers.referer || '';

  const twoHoursLater = new Date(Date.now() + 2 * 60 * 60 * 1000);
  const textToEncrypt = twoHoursLater.toISOString();
  
  // Encrypt
  const { encryptedData, iv } = encryptServer(textToEncrypt);

  return {
    props: {
      key: `${encryptedData}_*_${iv}`,
      referer
    }
  };
};

export default function EncryptedTimePage({ key,referer }:any) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(key).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
        });
    };

    useEffect(()=>{
       console.log({referer}) 
    },[])
    return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-6 p-6 bg-black text-white">
      <h1 className="text-4xl font-bold">RXCHEAT</h1>

      <Card className="p-4 w-full max-w-md bg-gray-800 border border-gray-700">
        <h2 className="text-xl mb-4">RXCHEAT Key</h2>

        {
            key.length ? <>
                            <Textarea
                                readOnly
                                value={key}
                                className="mb-4"
                                minRows={1}
                            />

                            <Button color="primary" onClick={handleCopy}>
                                {copied ? "Copied RXCHEAT Key!" : "Copy RXCHEAT Key"}
                            </Button>
                        </>
                        : <>
                            <p>Sorry No key for you. Come via the link</p>
                        </>
        }
        
      </Card>

      <footer className="mt-10 text-sm text-gray-400">
        Powered by RXCHEAT
      </footer>
    </main>
  );
}

