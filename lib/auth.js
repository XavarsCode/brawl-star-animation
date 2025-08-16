import { cookies } from 'next/headers';

export function getUser() {
  const c = cookies().get('session')?.value;
  if(!c) return null;
  try {
    const json = JSON.parse(Buffer.from(c, 'base64').toString('utf-8'));
    if(json.exp && json.exp > Date.now()) return { email: json.email };
  } catch {}
  return null;
}
