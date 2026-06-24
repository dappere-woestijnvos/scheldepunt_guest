self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  event.waitUntil(
    self.registration.showNotification(data.title || 'Scheldepunt', {
      body: data.body || 'New guest activity',
      icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><rect width="192" height="192" rx="32" fill="%231F1814"/><text x="96" y="130" text-anchor="middle" font-family="serif" font-style="italic" font-weight="500" font-size="120" fill="%23FBF6EB">S</text></svg>',
      badge: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"><rect width="96" height="96" rx="16" fill="%231F1814"/><text x="48" y="68" text-anchor="middle" font-family="serif" font-size="60" fill="%23FBF6EB">S</text></svg>',
      tag: data.tag || 'scheldepunt',
      renotify: true,
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((list) => {
      if (list.length) return list[0].focus();
      return clients.openWindow('/');
    })
  );
});
