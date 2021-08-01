/* eslint-disable no-console */
/* eslint-disable no-restricted-globals */
const CACHE_NAME = 'gamedev-cache-v1';

const URLS = [
  '/computationWorker.js',
  '/main.css',
  '/main.js',
  '/locales/en/translation.json',
  '/locales/ru/translation.json',
  '/offline.html',
];

// Не кешировать роуты приложения, чтобы отдавать именно оффлайн страничку (с тайтлом оффлайн)
// Нужно просто для того, чтобы для оффлайн работы использовался специальный html
const NEVER_CACHE_URLS = [
  '/',
  '/login',
  '/game',
  '/registration',
  '/forum',
  '/leaderboard',
  '/profile',
  '/profile-edit',
  '/profile-password-edit',
  '/topic',
  '/new-post',
];

this.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(URLS))
      .catch((err) => {
        console.log(err);
        throw err;
      }),
  );
});

this.addEventListener('activate', () => {
  console.log('activate');
});

this.addEventListener('fetch', (event) => {
  if (!(event.request.url.indexOf('http') === 0)) {
    // Это нужно, чтобы работали запросы в chrome-extension:// например на /build/react_devtools_backend.js
    event.respondWith(fetch(event.request));
    return;
  }
  // Идем на сервер, если он отвечает, то отдаем юзеру ответ и кладем его в кеш
  // Если не отвечает, то смотрим в кеше. Eсли в кеше нет, то отправляем на оффлайн странчку spa
  event.respondWith(
    fetch(event.request)
      // Смотрим на сервер
      .then((response) => {
        // Возвращаем ответ БЕЗ записи в кеш, если не хотим в него такое класть
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // Если путь в списке NEVER_CACHE_URLS, то ответ в кеш не кладем
        const requestPath = new URL(event.request.url).pathname;
        if (NEVER_CACHE_URLS.includes(requestPath)) {
          return response;
        }

        // Это нужно, чтобы в 2 местах использовать ответ (отдать юзеру и записать в кеш)
        const responseToCache = response.clone();

        caches.open(CACHE_NAME)
          .then((cache) => {
            cache.put(event.request, responseToCache);
          });

        return response;
      })

      // Смотрим ответ в кеше если фетч кинул ошибку
      .catch(() => caches.match(event.request)
        .then((cachedRes) => {
          // Если есть ответ в кеше, возвращаем его, иначе оффлайн страничку
          if (cachedRes) {
            return cachedRes;
          }
          return caches.match('/offline.html');
        })),
  );
});
