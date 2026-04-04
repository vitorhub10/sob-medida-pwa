'use client';

import { useEffect, useState } from 'react';
import { Download } from 'lucide-react';

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
};

export function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [message, setMessage] = useState('Instale o app na tela inicial');

  useEffect(() => {
    const handler = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
      setMessage('Pronto para instalar no celular');
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) {
      setMessage('No iPhone: Compartilhar → Adicionar à Tela de Início.');
      return;
    }

    await deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;

    if (choice.outcome === 'accepted') {
      setMessage('App instalado com sucesso.');
      setDeferredPrompt(null);
    } else {
      setMessage('Instalação cancelada.');
    }
  };

  return (
    <button
      type="button"
      onClick={handleInstall}
      className="fixed bottom-24 right-4 z-50 flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-2xl shadow-blue-950/30"
      aria-label="Instalar app"
      title={message}
    >
      <Download size={18} />
      Instalar App
    </button>
  );
}
