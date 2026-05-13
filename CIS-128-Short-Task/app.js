

//check service is registered
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register("/CIS-128-Short-Task/service-worker.js")
    .then((reg) => console.log('service worker registered', reg))
    .catch((err) => console.log('service worker not registered',err));
}