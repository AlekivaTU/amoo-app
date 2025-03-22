module.exports = {
  globDirectory: 'build/',
  globPatterns: [
    '**/*.{js,css,html,png,jpg,jpeg,gif,svg,ico,json}',
  ],
  swDest: 'build/service-worker.js',
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/api\.amoo\.app/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'api-cache',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 24 * 60 * 60, // 24 часа
        },
      },
    },
    {
      urlPattern: /\.(?:png|gif|jpg|jpeg|svg)$/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'images',
        expiration: {
          maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 дней
        },
      },
    },
  ],
  skipWaiting: true,
  clientsClaim: true,
}; 