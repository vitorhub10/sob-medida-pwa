import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import { AppShell } from '@/components/app-shell';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sob Medida PWA',
  description: 'App PWA de desenvolvimento pessoal com tracker...',
  robots: {
    index: false,
    follow: false,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Sob Medida'
  },
  icons: {
    icon: '/icons/icon-192.png',
    apple: '/icons/icon-192.png'
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
