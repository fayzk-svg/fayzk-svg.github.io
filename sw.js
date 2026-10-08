// Nerve service worker, generated at build time (see vite.config.ts).
// Precaches the whole app so it runs with no connection. A new version
// installs in the background and waits; the app switches to it between
// sessions, never during one.

const VERSION = '63c514b59cc4';
const ASSETS = [
  "./",
  "./index.html",
  "./assets/barlow-condensed-latin-600-normal-BFJEwTuo.woff",
  "./assets/barlow-condensed-latin-600-normal-DepVgxBB.woff2",
  "./assets/bricolage-figtree-B6WTm-5y.js",
  "./assets/bricolage-figtree-C_44GGJ9.css",
  "./assets/bricolage-grotesque-latin-600-normal-nxTgbNFE.woff2",
  "./assets/bricolage-grotesque-latin-700-normal-gtcctNPv.woff2",
  "./assets/bricolage-grotesque-latin-800-normal-J50vIsBe.woff2",
  "./assets/esm-Dd-FQEsK.js",
  "./assets/esm-DgOllNi0.js",
  "./assets/figtree-latin-400-normal-g7Dtegnw.woff2",
  "./assets/figtree-latin-500-normal-BWnGEVsr.woff2",
  "./assets/figtree-latin-600-normal-Cv_xCTDl.woff2",
  "./assets/figtree-latin-700-normal-th6qEP7c.woff2",
  "./assets/ibm-plex-sans-latin-400-normal-CDDApCn2.woff2",
  "./assets/ibm-plex-sans-latin-400-normal-CYLoc0-x.woff",
  "./assets/ibm-plex-sans-latin-600-normal-Cu4Hd6ag.woff",
  "./assets/ibm-plex-sans-latin-600-normal-CuJfVYMP.woff2",
  "./assets/index-DUsGsemt.css",
  "./assets/index-tpL4k2sO.js",
  "./assets/manrope-latin-400-normal-PaqtzbVb.woff2",
  "./assets/manrope-latin-500-normal-BYYD-dBL.woff2",
  "./assets/manrope-latin-600-normal-4f0koTD-.woff2",
  "./assets/manrope-latin-700-normal-BZp_XxE4.woff2",
  "./assets/outfit-latin-400-normal-BGsTXAXT.woff2",
  "./assets/outfit-latin-500-normal-DKnIMDSk.woff2",
  "./assets/outfit-latin-600-normal-B7SfZ07L.woff2",
  "./assets/outfit-latin-700-normal-Cu9v6i1X.woff2",
  "./assets/saira-condensed-latin-600-normal-0taFJMb7.woff2",
  "./assets/saira-condensed-latin-700-normal-BpDqMSKw.woff2",
  "./assets/saira-condensed-latin-800-normal-Pyk8ZVcZ.woff2",
  "./assets/saira-outfit-BMsvLGiq.css",
  "./assets/saira-outfit-bixquTW8.js",
  "./assets/unbounded-latin-600-normal-oRSANpZr.woff2",
  "./assets/unbounded-latin-700-normal-CaoNriVp.woff2",
  "./assets/unbounded-latin-800-normal-CN2Hxyoo.woff2",
  "./assets/unbounded-manrope-Cc_aJX28.js",
  "./assets/unbounded-manrope-VHEgmj21.css",
  "./assets/web-CJtxFDWF.js",
  "./assets/web-H8yxjMeo.js",
  "./icons/apple-touch-icon.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./manifest.webmanifest"
];
const CACHE = `nerve-${VERSION}`;

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('nerve-') && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('message', (event) => {
  if (event.data === 'skip-waiting') self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;
  // Any page load gets the cached app shell, query string or not (e.g. ?duration=20).
  if (request.mode === 'navigate') {
    const shell = (path) => caches.match(new URL(path, self.registration.scope).href, { ignoreVary: true });
    event.respondWith(
      shell('./index.html')
        .then((r) => r || shell('./'))
        .then((r) => r || fetch(request)),
    );
    return;
  }
  // ignoreVary: the page's own requests carry headers (Origin, Accept-Encoding) that the
  // install-time requests didn't, and a Vary header from the server would otherwise miss.
  event.respondWith(caches.match(request, { ignoreSearch: true, ignoreVary: true }).then((r) => r || fetch(request)));
});
