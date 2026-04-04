'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Brain, Home, Smartphone, Wallet } from 'lucide-react';
import { InstallButton } from '@/components/install-button';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/tdah', label: 'TDAH', icon: Brain },
  { href: '/burnout', label: 'Burnout', icon: Smartphone },
  { href: '/finance', label: 'Finance', icon: Wallet }
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col px-4 pb-28 pt-5">
      <header className="mb-5 flex items-center justify-between rounded-3xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-xl">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-300">PWA</p>
          <h1 className="bg-gradient-to-r from-sky-300 via-blue-400 to-emerald-400 bg-clip-text text-xl font-bold text-transparent">
            Sob Medida
          </h1>
        </div>
        <div className="rounded-2xl border border-emerald-300/25 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-200">
          offline ready
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <nav className="fixed bottom-4 left-1/2 z-40 flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 items-center justify-between rounded-[2rem] border border-white/15 bg-slate-900/70 px-2 py-2 backdrop-blur-2xl">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex min-w-[68px] flex-col items-center gap-1 rounded-2xl px-3 py-2 text-xs transition ${
                active
                  ? 'bg-gradient-to-r from-blue-500/35 to-emerald-500/25 text-white'
                  : 'text-slate-300 hover:bg-white/5'
              }`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <InstallButton />
    </div>
  );
}
