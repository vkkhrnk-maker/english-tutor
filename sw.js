// Офлайн-кэш оболочки приложения. Сами книги лежат в IndexedDB и через этот файл не проходят.
const VERSION = 'bd60ecfa71';
const CACHE = `entutor-${VERSION}`;
const SHELL = ['./', 'index.html', 'manifest.webmanifest', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png', 'en-frequency.txt'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith('entutor-') && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // страница: сначала сеть, чтобы обновления приходили сразу; без сети — из кэша
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req, { cache: 'no-cache' })   // мимо HTTP-кэша: GitHub Pages разрешает держать страницу 10 минут
        .then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put('index.html', copy)); return res; })
        .catch(() => caches.match('index.html'))
    );
    return;
  }

  // свои файлы и шрифты Google: из кэша, в фоне обновляем
  const isFont = url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';
  if (url.origin !== location.origin && !isFont) return;   // archive.org audio goes straight to IndexedDB
  if (url.origin === location.origin || isFont) {
    e.respondWith(
      caches.match(req).then(hit => {
        const net = fetch(req, isFont ? {} : { cache: 'no-cache' }).then(res => {
          if (res.ok || res.type === 'opaque') { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
          return res;
        }).catch(() => hit);
        return hit || net;
      })
    );
  }
});
