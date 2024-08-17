import Link from 'next/link';

export default function Custom404() {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1 style={{ fontSize: '4rem' }}>404 - Page Not Found</h1>
      <p>Loosu 🤣</p>
      <Link href="/">Poda login page ku</Link>
    </div>
  );
};
