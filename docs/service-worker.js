importScripts("/precache-manifest.057f14e96cfa10a59dcf3ce038d331dd.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

/* eslint-disable no-undef */

const { registerRoute } = workbox.routing;
const { StaleWhileRevalidate, CacheFirst } = workbox.strategies;
const expiration = workbox.expiration;

workbox.precaching.precacheAndRoute(self.__precacheManifest);

workbox.core.skipWaiting();
workbox.core.clientsClaim();

console.dir(workbox);
console.dir(self);

registerRoute(
  ({ request }) => request.destination === "image",
  new CacheFirst({
    cacheName: "runtime",
    plugins: [
      new expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 7,
      }),
    ],
  })
);
registerRoute(
  ({ request }) =>
    request.destination === "style" || request.destination === "script" || request.destination === "worker",
  new StaleWhileRevalidate({
    cacheName: "runtime",
    plugins: [
      new expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24,
      }),
    ],
  })
);

