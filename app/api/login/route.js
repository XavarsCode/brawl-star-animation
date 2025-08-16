import { NextResponse } from 'next/server';

export async function POST(req) {
  const { email, password } = await req.json();
  if (email === 'demo@local' && password === 'demo') {
    const token = Buffer.from(JSON.stringify({ email, exp: Date.now()+ 1000*60*60*8 })).toString('base64');
    const res = NextResponse.json({ ok: true });
    res.cookies.set('session', token, { httpOnly: true, path: '/', maxAge: 60*60*8 });
    return res;
  }
  return NextResponse.json({ ok:false }, { status: 401 });
}
