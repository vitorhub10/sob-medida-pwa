import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Brain, Home, Smartphone, Wallet } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';

const cards = [
  {
    title: 'Home',
    href: '/',
    description: 'Visão geral do seu progresso diário.',
    icon: Home
  },
  {
    title: 'TDAH',
    href: '/tdah',
    description: 'Blocos curtos com tarefa, recompensa e check de dopamina.',
    icon: Brain
  },
  {
    title: 'Burnout',
    href: '/burnout',
    description: 'Modo avião, escala de energia e dicas rápidas.',
    icon: Smartphone
  },
  {
    title: 'Finance',
    href: '/finance',
    description: 'Controle de gastos com total e categorias.',
    icon: Wallet
  }
];

export default async function HomePage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    redirect('/login');
  }

  return (
    <div className="space-y-4">
      <section className="glass rounded-[2rem] p-6">
        <p className="mb-2 text-xs uppercase tracking-[0.35em] text-sky-200">Desenvolvimento pessoal</p>
        <h2 className="text-3xl font-black leading-tight">
          Seu espaço <span className="bg-gradient-to-r from-blue-300 to-emerald-300 bg-clip-text text-transparent">sob medida</span>
        </h2>
        <p className="mt-3 text-sm text-slate-300">
          TDAH, burnout digital e finanças em um PWA bonito, instalável e pronto para usar offline.
        </p>
      </section>

      <section className="grid grid-cols-2 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.title}
              href={card.href}
              className="glass card-hover min-h-[170px] rounded-[2rem] p-4"
            >
              <div className="mb-5 inline-flex rounded-2xl bg-gradient-to-r from-blue-500/30 to-emerald-500/20 p-3">
                <Icon className="text-white" size={22} />
              </div>
              <h3 className="text-lg font-semibold text-white">{card.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{card.description}</p>
            </Link>
          );
        })}
      </section>

      <section className="glass rounded-[2rem] p-5">
        <h3 className="text-base font-semibold">Recursos inclusos</h3>
        <div className="mt-4 grid gap-3 text-sm text-slate-200">
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">LocalStorage para salvar seus dados</div>
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">Botão fixo de instalação</div>
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">Manifest, ícones e suporte offline</div>
        </div>
      </section>
    </div>
  );
}