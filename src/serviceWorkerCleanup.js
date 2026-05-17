export function cleanupLegacyServiceWorkers() {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return;
  }

  window.addEventListener('load', async () => {
    try {
      const registrations = await navigator.serviceWorker.getRegistrations();

      if (registrations.length === 0) {
        return;
      }

      await Promise.all(registrations.map((registration) => registration.unregister()));

      const reloadKey = 'deu-bom-service-worker-cleaned';
      if (navigator.serviceWorker.controller && sessionStorage.getItem(reloadKey) !== '1') {
        sessionStorage.setItem(reloadKey, '1');
        window.location.reload();
      }
    } catch (error) {
      console.warn('Nao foi possivel limpar o service worker antigo.', error);
    }
  });
}
