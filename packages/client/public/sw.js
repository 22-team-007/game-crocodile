const CACHE_NAME = 'le39grgt'
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME]
  event.waitUntil(
    caches.keys().then(keyList =>
      Promise.all(
        keyList.map(key => {
          if (!cacheWhitelist.includes(key)) return caches.delete(key)
        })
      )
    )
  )
})

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      cache.addAll([
        '/',
        '/signin',
        '/signup',
        '/leaders',
        '/forum',
        '/game',
        '/sw.js',
        '/FullScreen_In.mp3',
        '/FullScreen_Out.mp3',
        '/assets/vite.svg',
        '/assets/arrow.svg',
      ])
    })
  )
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request)
    })
  )
})
