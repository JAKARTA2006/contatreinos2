const CACHE_NAME = 'jj-tracker-v1';

// Lista de recursos vitais para o app funcionar offline
const PRECACHE_URLS = [
  './',
  './index.html',
  './manifest.json',
  './icon.svg',
  './index.tsx',
  './App.tsx',
  './types.ts',
  './utils/dateUtils.ts',
  './utils/pdfExporter.ts',
  './utils/assets.ts',
  './components/BeltDisplay.tsx',
  './components/BeltSelector.tsx',
  './components/HistoryTracker.tsx',
  './components/StatsGrid.tsx',
  './pages/Home.tsx',
  './pages/About.tsx',
  './pages/Contact.tsx'
];

// Instalação: Cache dos arquivos estáticos principais
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_URLS);
    })
  );
  self.skipWaiting();
});

// Ativação: Limpeza de caches antigos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch: Estratégia "Stale-While-Revalidate"
// Tenta servir do cache rápido, mas busca atualização na rede em segundo plano
self.addEventListener('fetch', (event) => {
  // Não cachear requisições POST ou que não sejam http/https (ex: chrome-extension)
  if (!event.request.url.startsWith('http')) return;

  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(event.request).then((response) => {
        const fetchPromise = fetch(event.request).then((networkResponse) => {
          // Se a resposta da rede for válida, atualiza o cache
          if (networkResponse && networkResponse.status === 200) {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        }).catch(() => {
          // Se falhar (offline) e não tiver cache, apenas retorna undefined (erro será tratado pelo browser)
        });

        // Retorna o cache se existir, senão espera a rede
        return response || fetchPromise;
      });
    })
  );
});