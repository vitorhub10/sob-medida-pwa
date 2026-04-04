# Sob Medida PWA

PWA em Next.js 14 + Tailwind com 4 telas funcionais:
- Home
- TDAH
- Burnout
- Finance

## Rodar localmente

```bash
npm install
npm run dev
```

## Build de produção

```bash
npm install
npm run build
npm run start
```

## Deploy na Vercel

1. Suba os arquivos para um repositório GitHub.
2. Entre na Vercel e importe o repositório.
3. Framework: Next.js.
4. Deploy automático.

## Deploy na Netlify

1. Suba os arquivos para GitHub.
2. Importe na Netlify.
3. Build command: `npm run build`
4. Publish directory: `.next`

## Instalar no Android
- Abra o site no Chrome.
- Toque em **Instalar App** ou no menu do navegador.
- Confirme a instalação.

## Instalar no iPhone
- Abra no Safari.
- Toque em **Compartilhar**.
- Escolha **Adicionar à Tela de Início**.

## Offline e Push-ready
- `next-pwa` configurado.
- Service worker gerado no build.
- Arquivo `lib/push.ts` pronto para integrar notificações push.

## APK via Capacitor (opcional)

```bash
npm install @capacitor/cli @capacitor/core @capacitor/android
npx next build
npx next export
npx cap add android
npx cap sync
npx cap open android
```

Depois, gere o APK pelo Android Studio.
