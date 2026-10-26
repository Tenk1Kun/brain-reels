// Brain Reels service worker: keeps a copy of the app on the device, so it opens instantly
// and the setup and quiz screens work without a connection. Videos always need the internet.
// Only this app's own files are cached; YouTube and Google requests go straight to the network.

const CACHE = "brain-reels-v1";
const APP_SHELL = ["./", "./index.html", "./icon.svg", "./manifest.webmanifest"];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  // Remove caches from older versions of this file.
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET" || new URL(request.url).origin !== self.location.origin) {
    return;
  }
  if (request.mode === "navigate") {
    // Pages: the newest version when online, the saved one when offline.
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE).then((cache) => cache.put("./index.html", copy));
          return response;
        })
        .catch(() => caches.match("./index.html")),
    );
    return;
  }
  // Scripts, styles, and pictures: the saved copy at once, refreshed in the background.
  event.respondWith(
    caches.match(request).then((saved) => {
      const fresh = fetch(request)
        .then((response) => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => saved);
      return saved ?? fresh;
    }),
  );
});
