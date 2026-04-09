import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import TdahClient from './tdah-client';

export default async function TDAHPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    redirect('/login');
  }

  return <TdahClient />;
}