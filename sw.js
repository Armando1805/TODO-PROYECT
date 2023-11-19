self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('my-cache').then((cache) => {
        return cache.addAll([
          '/'
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  });
  
  self.addEventListener('push', (event) => {
    const options = {
      body: event.data.text(),
    //   icon: '/icon.png', // Ruta al ícono de la notificación
    };
  
    // Verificar si se concede el permiso para mostrar notificaciones
    if (self.registration.showNotification && Notification.permission === 'granted') {
      event.waitUntil(
        self.registration.showNotification('Nuevo TODO', options)
      );
    }
  });
  