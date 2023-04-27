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
        '/game',
        '/profile',
        '/leaders',
        '/forum',
        '/FullScreen_In.mp3',
        '/FullScreen_Out.mp3',
        '/userEnter.mp3',
        '/YouWon.mp3',
        '/favicon.svg',
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
