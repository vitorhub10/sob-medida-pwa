export async function registerForPush() {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
    throw new Error('Push notifications não suportadas neste dispositivo.');
  }

  const registration = await navigator.serviceWorker.ready;
  return registration;
}
