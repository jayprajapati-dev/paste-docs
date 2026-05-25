/// <reference lib="webworker" />
declare let self: ServiceWorkerGlobalScope;

import { precacheAndRoute, cleanupOutdatedCaches, createHandlerBoundToURL } from 'workbox-precaching';
import { NavigationRoute, registerRoute } from 'workbox-routing';

// Cleanup old caches
cleanupOutdatedCaches();

// Precache all assets injected by vite-plugin-pwa
precacheAndRoute(self.__WB_MANIFEST);

// Handle SPA routing to index.html
try {
  const handler = createHandlerBoundToURL('/index.html');
  const navigationRoute = new NavigationRoute(handler, {
    denylist: [
      /^\/_/,
      /\/[^/?]+\.[^/]+$/
    ]
  });
  registerRoute(navigationRoute);
} catch (e) {
  // Graceful failure if handler binding fails
}

// Custom, robust fetch listener for everything else
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Bypass service worker entirely for development assets, localhost/development run domains, or Vite compiler modules
  const isDevEnvironment = 
    url.hostname === 'localhost' || 
    url.hostname === '127.0.0.1' || 
    url.port === '3000' ||
    url.hostname.includes('ais-dev-') ||
    url.pathname.includes('/node_modules/') ||
    url.pathname.startsWith('/src/') ||
    /\.(tsx?|jsx?|css)$/.test(url.pathname) ||
    url.searchParams.has('t') ||
    url.searchParams.has('import') ||
    url.searchParams.has('v') ||
    url.searchParams.has('commonjs-entry');

  if (isDevEnvironment) {
    return; // Bypass service worker and let browser load native modules directly
  }

  // 1. Scheme & Method Guards: Ignore non-GET requests or unsupported schemes immediately.
  if (event.request.method !== 'GET' || !url.protocol.startsWith('http')) {
    return;
  }

  // Bypass custom service worker logic for sitemaps, robots.txt, verification files, or any raw XML/text files
  if (
    url.pathname.endsWith('sitemap.xml') || 
    url.pathname.endsWith('robots.txt') || 
    url.pathname.endsWith('.xml') || 
    url.pathname.endsWith('.txt') ||
    url.pathname.includes('/sitemap')
  ) {
    return;
  }

  // Let Workbox's built-in NavigationRoute handle HTML navigation to index.html safely
  if (event.request.mode === 'navigate') {
    return;
  }

  event.respondWith(
    (async () => {
      try {
        // Try the cache first
        const cachedResponse = await caches.match(event.request);
        if (cachedResponse) {
          // Stale-While-Revalidate: Update cache in background safely with robust promise catching
          event.waitUntil(
            (async () => {
              try {
                const networkResponse = await fetch(event.request.clone());
                if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
                  const cache = await caches.open('pastedocs-runtime-cache');
                  await cache.put(event.request, networkResponse);
                }
              } catch (e) {
                // Silently catch background fetch or cache write failures
              }
            })()
          );
          return cachedResponse;
        }

        // If not in cache, fallback to Network
        const networkResponse = await fetch(event.request);
        
        // Cache valid, basic responses (avoid caching opaque or error responses)
        // 2. Cross-Origin Safety: We ONLY cache `type === 'basic'` (same origin) safely.
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          try {
            const cache = await caches.open('pastedocs-runtime-cache');
            await cache.put(event.request, networkResponse.clone());
          } catch (cacheError) {
            // Silently catch cache writing errors
          }
        }
        
        return networkResponse;
      } catch (error) {
        console.error('Service Worker Fetch Failed:', error);
        return Response.error();
      }
    })()
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
