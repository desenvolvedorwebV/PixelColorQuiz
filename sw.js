const CACHE_NAME = 'pixel-quiz-v3';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './PixelColorQuiz.png',
  './audio/pop.mp3',
  './audio/powerup.mp3',
  './audio/card.mp3',
  './audio/error.mp3',
  './audio/win.mp3',
  './audio/bg_music.mp3'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
