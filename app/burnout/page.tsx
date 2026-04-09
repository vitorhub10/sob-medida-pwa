import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import BurnoutClient from './burnout-client';

export default async function BurnoutPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    redirect('/login');
  }

  return <BurnoutClient />;
}