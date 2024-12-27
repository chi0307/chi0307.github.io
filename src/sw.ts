import { precacheAndRoute } from 'workbox-precaching'

declare let self: ServiceWorkerGlobalScope

// 快取靜態檔案
const staticCacheList = self.__WB_MANIFEST
precacheAndRoute(staticCacheList)

function includeStaticCacheList(requestUrl: URL): boolean {
  const cachePathnameList = staticCacheList.map((item) => {
    const url = typeof item === 'string' ? item : item.url
    return new URL(url, self.location.origin).pathname
  })
  return cachePathnameList.includes(requestUrl.pathname)
}

const CACHE_NAME = 'dynamic-cache-v1'

// 目前需要手動 cache 一些設定位置中的檔案
// 推測可能原因跟多入口有關係，在 build 的時候不會知道需要 cache 的檔案有哪些
const dynamicCacheStartWithList = ['/assets/', '/css/', '/js/', '/projects/']
function includeDynamicCacheList(requestUrl: URL): boolean {
  return dynamicCacheStartWithList.some((cacheStartWithString) =>
    requestUrl.pathname.startsWith(cacheStartWithString),
  )
}

// 確保新的 Service Worker 立即接管
self.addEventListener('activate', (event): void => {
  event.waitUntil(self.clients.claim())
})
self.addEventListener('install', (event): void => {
  event.waitUntil(self.skipWaiting())
})

self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url)
  if (requestUrl.origin !== self.location.origin) {
    return
  }

  if (!includeStaticCacheList(requestUrl) && !includeDynamicCacheList(requestUrl)) {
    return // 不是需要 cache 的清單就放他過去 (不要讓他被 service worker 影響到)，因為 github page 有多個 repo 可以顯示靜態網頁，希望可以繞過去看其他 repo 顯示
  }

  if (includeDynamicCacheList(requestUrl)) {
    event.respondWith(
      toPromiseLike(async () => {
        let cachedResponse: Response | undefined = await caches.match(event.request)
        if (cachedResponse !== undefined) {
          return cachedResponse
        }
        cachedResponse = await fetch(event.request)
        const cache = await caches.open(CACHE_NAME)
        await cache.put(event.request, cachedResponse.clone())
        return cachedResponse
      }),
    )
  }
})

function toPromiseLike<T>(asyncFunction: () => Promise<T>): PromiseLike<T> {
  return asyncFunction()
}
