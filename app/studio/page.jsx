import { redirect } from 'next/navigation';
import { getUser } from '@/lib/auth';
import StudioClient from './studio-client';

export default function StudioPage({ searchParams }) {
  const user = getUser();
  if(!user) redirect('/login');
  return <StudioClient searchParams={searchParams} user={user} />;
}
