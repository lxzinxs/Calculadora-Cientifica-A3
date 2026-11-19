const CACHE = "cybercalc-a3-v3";
const FILES = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./src/styles/style.css",
  "./src/js/core/math-engine.js",
  "./src/js/core/storage.js",
  "./src/js/modules/numerical.js",
  "./src/js/modules/graph-scale.js",
  "./src/js/modules/graphs.js",
  "./src/js/modules/matrices.js",
  "./src/js/modules/combinatorics.js",
  "./src/js/modules/calculus.js",
  "./src/js/modules/advanced.js",
  "./src/js/ui/script.js",
  "./src/js/ui/interface.js",
  "./src/js/ui/pwa.js",
  "./assets/css/utilities.css",
  "./assets/css/icons.css",
  "./assets/css/fonts.css",
  "./assets/fonts/jetbrains.woff2",
  "./assets/fonts/inter.woff2",
  "./assets/fonts/fa-solid-900.woff2",
  "./assets/vendor/math.js",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png",
];
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open(CACHE)
      .then((c) => c.addAll(FILES))
      .then(() => self.skipWaiting()),
  );
});
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((k) => k.startsWith("cybercalc-a3-") && k !== CACHE)
            .map((k) => caches.delete(k)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});
self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  if (
    e.request.method !== "GET" ||
    url.origin !== self.location.origin ||
    !url.pathname.startsWith(new URL("./", self.location).pathname)
  )
    return;
  // Refresh navigations online; use the cached shell when the network is absent.
  if (e.request.mode === "navigate") {
    e.respondWith(fetch(e.request).catch(() => caches.match("./index.html")));
    return;
  }
  e.respondWith(
    caches.match(e.request).then((cached) => cached || fetch(e.request)),
  );
});
