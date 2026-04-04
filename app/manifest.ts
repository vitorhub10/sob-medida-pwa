import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Sob Medida - Desenvolvimento Pessoal',
    short_name: 'Sob Medida',
    description: 'PWA instalável com trackers para TDAH, burnout digital e minimalismo financeiro.',
    start_url: '/',
    display: 'standalone',
    background_color: '#07111f',
    theme_color: '#2196F3',
    orientation: 'portrait',
    lang: 'pt-BR',
    icons: [
      {
        src: '/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png'
      },
      {
        src: '/icons/maskable-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      }
    ]
  };
}
