const staticCacheName = 'site-static-v1';
const assets = [
    '/',
    '/CIS-128-Short-Task/Hybrid.html',
    '/CIS-128-Short-Task/style.css',
    '/CIS-128-Short-Task/service-worker.js',
    '/CIS-128-Short-Task/app.js'
]




//install service worker
self.addEventListener('install', evt => {
    console.log('service worker has been installed');
    evt.waitUntil(
        caches.open(staticCacheName)
        .then(cache => {
        console.log('caching shell assets');
         return cache.addAll(assets)
        })
    );
});

//activate event
self.addEventListener('activate', evt => {
    console.log('service worker has been activate');
    evt.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key !== staticCacheName)
                .map(key => caches.delete(key))
            )
        })
    );
});

//fetch event
self.addEventListener('fetch', evt => {
    evt.respondWith(
        caches.match(evt.request)
        .then(cacheRes => {
            return cacheRes || fetch(evt.request);
        })
    )

})