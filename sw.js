/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("workbox-v3.6.3/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "workbox-v3.6.3"});

workbox.core.setCacheNameDetails({prefix: "gatsby-plugin-offline"});

workbox.skipWaiting();
workbox.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "webpack-runtime-f3548d099dbec64493a6.js"
  },
  {
    "url": "styles.87681db1595315243a06.css"
  },
  {
    "url": "styles-407fe62976dc5310c43e.js"
  },
  {
    "url": "framework-b049b847da93b37c0f49.js"
  },
  {
    "url": "app-20f310da6f6fbeef11d5.js"
  },
  {
    "url": "component---node-modules-gatsby-plugin-offline-app-shell-js-4e364838b550723a2458.js"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "8b4b4c867830299c2f9fa9c9cbeb6112"
  },
  {
    "url": "google-fonts/s/firasans/v10/va9B4kDNxMZdWfMOD5VnLK3eRhf6.woff2",
    "revision": "2ecb426f85ffc1c53b677556210e629f"
  },
  {
    "url": "google-fonts/s/firasans/v10/va9B4kDNxMZdWfMOD5VnPKreRhf6.woff2",
    "revision": "b39aa336eef260975654fde0959de6fe"
  },
  {
    "url": "google-fonts/s/firasans/v10/va9B4kDNxMZdWfMOD5VnSKzeRhf6.woff2",
    "revision": "5a2c789b59571ce97f51f9c75600f49b"
  },
  {
    "url": "google-fonts/s/firasans/v10/va9B4kDNxMZdWfMOD5VnZKveRhf6.woff2",
    "revision": "d8bc03a60729f4b05b42e057e21eaed3"
  },
  {
    "url": "google-fonts/s/firasans/v10/va9C4kDNxMZdWfMOD5Vn9LjJYTI.woff2",
    "revision": "d67acf5dba25b4f92e3eadad20032199"
  },
  {
    "url": "google-fonts/s/firasans/v10/va9E4kDNxMZdWfMOD5Vvl4jL.woff2",
    "revision": "78773521b0ffe376bc7edd8ec2a591fb"
  },
  {
    "url": "google-fonts/s/poppins/v13/pxiByp8kv8JHgFVrLCz7Z1xlFQ.woff2",
    "revision": "f4f17fd53c7d040e56f91a3ecb692b22"
  },
  {
    "url": "google-fonts/s/poppins/v13/pxiByp8kv8JHgFVrLDz8Z1xlFQ.woff2",
    "revision": "9ddc04912d6e8f88d9de4045b8b89c59"
  },
  {
    "url": "google-fonts/s/poppins/v13/pxiByp8kv8JHgFVrLEj6Z1xlFQ.woff2",
    "revision": "087457026965f98466618a478c4b1b07"
  },
  {
    "url": "google-fonts/s/poppins/v13/pxiByp8kv8JHgFVrLGT9Z1xlFQ.woff2",
    "revision": "84780596e268aa0cb2be48af2ed5c375"
  },
  {
    "url": "google-fonts/s/poppins/v13/pxiEyp8kv8JHgFVrJJfecg.woff2",
    "revision": "9ed361bba8488aeb2797b82befda20f1"
  },
  {
    "url": "polyfill-8e3c665999ec3f2f290c.js"
  },
  {
    "url": "manifest.webmanifest",
    "revision": "a023762a0e019d85995b851b0b710365"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/(\.js$|\.css$|static\/)/, workbox.strategies.cacheFirst(), 'GET');
workbox.routing.registerRoute(/^https?:.*\page-data\/.*\/page-data\.json/, workbox.strategies.networkFirst(), 'GET');
workbox.routing.registerRoute(/^https?:.*\.(png|jpg|jpeg|webp|svg|gif|tiff|js|woff|woff2|json|css)$/, workbox.strategies.staleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/^https?:\/\/fonts\.googleapis\.com\/css/, workbox.strategies.staleWhileRevalidate(), 'GET');

/* global importScripts, workbox, idbKeyval */

importScripts(`idb-keyval-iife.min.js`)

const { NavigationRoute } = workbox.routing

const navigationRoute = new NavigationRoute(async ({ event }) => {
  let { pathname } = new URL(event.request.url)
  pathname = pathname.replace(new RegExp(`^`), ``)

  // Check for resources + the app bundle
  // The latter may not exist if the SW is updating to a new version
  const resources = await idbKeyval.get(`resources:${pathname}`)
  if (!resources || !(await caches.match(`/app-20f310da6f6fbeef11d5.js`))) {
    return await fetch(event.request)
  }

  for (const resource of resources) {
    // As soon as we detect a failed resource, fetch the entire page from
    // network - that way we won't risk being in an inconsistent state with
    // some parts of the page failing.
    if (!(await caches.match(resource))) {
      return await fetch(event.request)
    }
  }

  const offlineShell = `/offline-plugin-app-shell-fallback/index.html`
  return await caches.match(offlineShell)
})

workbox.routing.registerRoute(navigationRoute)

const messageApi = {
  setPathResources(event, { path, resources }) {
    event.waitUntil(idbKeyval.set(`resources:${path}`, resources))
  },

  clearPathResources(event) {
    event.waitUntil(idbKeyval.clear())
  },
}

self.addEventListener(`message`, event => {
  const { gatsbyApi } = event.data
  if (gatsbyApi) messageApi[gatsbyApi](event, event.data)
})
