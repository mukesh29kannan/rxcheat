'use client';

import { Button, Card, Textarea } from '@nextui-org/react';
import { useEffect, useState } from 'react';

interface Props {
  keyValue: string;
  referer: string;
}



export default function EncryptedTimeClient({ keyValue,referer }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(keyValue).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  useEffect(()=>{
    history?.pushState(null, "", '/free-keys');
    console.log({keyValue,referer})
  },[])

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-6 p-6 bg-black text-white">
      <h1 className="text-4xl font-bold">RXCHEAT</h1>

      <Card className="p-4 w-full max-w-md bg-gray-800 border border-gray-700">
        <h2 className="text-xl mb-4">RXCHEAT Key (valid for 2 hours)</h2>

        {keyValue && keyValue.length > 0 ? (
          <>
            <Textarea readOnly value={keyValue} className="mb-4" minRows={1} />

            <Button color="primary" onClick={handleCopy}>
              {copied ? 'Copied RXCHEAT Key!' : 'Copy RXCHEAT Key'}
            </Button>
          </>
        ) : (
          <p>Sorry No key for you. Come via the link</p>
        )}
      </Card>

      <footer className="mt-10 text-sm text-gray-400">Powered by RXCHEAT</footer>
    </main>
  );
}
