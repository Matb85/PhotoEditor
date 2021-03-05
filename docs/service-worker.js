importScripts("/PhotoEditor/precache-manifest.f1b0c9bf00466b00a024088ffcbc8c30.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

/* eslint-disable no-undef */

const { registerRoute } = workbox.routing;
const { NetworkFirst, CacheFirst } = workbox.strategies;
const expiration = workbox.expiration;

workbox.precaching.precacheAndRoute(self.__precacheManifest);

workbox.core.skipWaiting();
workbox.core.clientsClaim();

console.dir(workbox);
console.dir(self);
console.dir(self.__precacheManifest);
console.dir(process.env.BASE_URL);
console.dir(process.env);

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

