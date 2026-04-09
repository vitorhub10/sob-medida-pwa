import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import FinanceClient from './finance-client';

export default async function FinancePage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    redirect('/login');
  }

  return <FinanceClient />;
}