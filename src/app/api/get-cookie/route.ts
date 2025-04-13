// app/api/get-cookie/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { parse } from 'cookie';

export async function GET(req: NextRequest) {
  const cookies = parse(req.headers.get('cookie') || '');
  const token = cookies.token || null;
  return NextResponse.json({ token });
}
