importScripts("/PhotoEditor/precache-manifest.be979a19e66e4c213d8a1005de508074.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

/* eslint-disable no-undef */

const { registerRoute } = workbox.routing;
const { NetworkFirst, CacheFirst } = workbox.strategies;
const expiration = workbox.expiration;

workbox.precaching.precacheAndRoute(self.__precacheManifest);

workbox.core.skipWaiting();
workbox.core.clientsClaim();

registerRoute(
  ({ request }) => request.destination === "image",
  new CacheFirst({
    cacheName: "runtime",
    plugins: [
      new expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24,
      }),
    ],
  })
);

registerRoute(
  ({ request }) => /(script|style)/.test(request.destination),
  new NetworkFirst({
    cacheName: "runtime",
    plugins: [
      new expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24,
      }),
    ],
  })
);

