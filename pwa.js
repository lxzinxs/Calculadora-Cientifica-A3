async function setupOffline() {
  const status = document.getElementById("offline-status");
  if (!("serviceWorker" in navigator) || !window.isSecureContext) {
    status.textContent = "OFFLINE REQUER HTTPS OU LOCALHOST";
    return;
  }
  try {
    await navigator.serviceWorker.register("./sw.js");
    await navigator.serviceWorker.ready;
    const cache = await caches.open("cybercalc-a3-v1");
    if (await cache.match("./index.html")) {
      status.textContent = "NÚCLEO DISPONÍVEL OFFLINE";
      document.getElementById("pwa-status").textContent = "PWA / CACHE OK";
    }
  } catch (err) {
    status.textContent = "CACHE OFFLINE INDISPONÍVEL";
    console.warn("Não foi possível preparar o cache offline:", err.message);
  }
}
setupOffline();
window.addEventListener("appinstalled", () =>
  document.getElementById("pwa-install-btn").classList.add("hidden"),
);
