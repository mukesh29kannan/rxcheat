// app/api/set-cookie/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function GET(req: NextRequest) {
  const forwarded = req.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : '0.0.0.0'; // fallback IP

  const cookie = serialize('token', ip, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 365, // 1 year
  });

  const response = NextResponse.json({ message: 'Cookie set!', ip });
  response.headers.set('Set-Cookie', cookie); // crucial part!
  return response;
}
