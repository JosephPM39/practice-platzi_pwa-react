/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */

// Precarga la app
self.__precacheManifest = [].concat(self.__precacheManifest || [])
workbox.precaching.suppressWarnings()
workbox.precaching.precacheAndRoute(self.__precacheManifest, {})

//Para configurar el service worker que inicie a cachear en runtime sin necesidad de recargar la página de nuevo
self.addEventListener('install', () => {
    self.skipWaiting(); //tells service worker to skip installing and activate it
    /*your code for pre-caching*/
});
self.addEventListener('activate', () => {
    clients.claim();
});


// App Shell
workbox.routing.registerNavigationRoute('/index.html')

// La API usa Stale While Revalidate para mayor velocidad
workbox.routing.registerRoute(/^https?:\/\/www.themealdb.com\/api\/.*/, workbox.strategies.staleWhileRevalidate(),
    'GET')

// Google Analytics Offline
workbox.googleAnalytics.initialize()


// Last fuentes van con Cache First y vencen al mes
workbox.routing.registerRoute(/^https:\/\/fonts.(?:googleapis|gstatic).com\/(.*)/,
    workbox.strategies.cacheFirst({
        cacheName: 'google-fonts-cache',
        plugins: [
            new workbox.expiration.Plugin({
                maxAgeSeconds: 30 * 24 * 60 * 60
            })
        ]
    }),
    'GET')

// Todo lo demás usa Network First
workbox.routing.registerRoute(/^https?.*/,
    workbox.strategies.networkFirst(), 'GET')

