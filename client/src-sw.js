const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

// method takes an array of URLs to precache
// self.__WB_MANIFEST is an array that contains list of URLs to precache
precacheAndRoute(self.__WB_MANIFEST);

// cache strategy for pages
const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60, //30 days
    }),
  ],
});

// warm cache for index.html and root (/) paths
warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

// register route for page navigation requests
registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// TODO: Implement asset caching
// cache strategy for assets 
const assetCache = new CacheFirst({
  cacheName: 'asset-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 7 * 24 * 60 * 60, //7 days
      maxEntries: 50,
    }),
  ],
});

// register route for assets
registerRoute(
  ({ request }) => 
    request.destination === 'style' ||
    request.destination === 'script',
    // use assetCache 
    assetCache
);
