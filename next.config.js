const withCSS = require('@zeit/next-css');
const withOffline = require('next-offline');
const withImages = require('next-images');

async function polyfillSetup(entries) {
  if (entries['main.js'] && !entries['main.js'].includes('./utils/polyfills.js')) {
    entries['main.js'].unshift('./utils/polyfills.js');
  }
  return entries;
}

const nextConfig = {
  cssModules: true,
  webpack: config => {
    const originalEntry = config.entry;
    config.entry = async () => {
      const entries = await originalEntry();
      return polyfillSetup(entries);
    };

    return config;
  },
  transformManifest: manifest => ['/'].concat(manifest), // add the homepage to the cache
  // Trying to set NODE_ENV=production when running yarn dev causes a build-time error so we
  // turn on the SW in dev mode so that we can actually test it
  generateInDevMode: true,
  workboxOpts: {
    swDest: 'static/service-worker.js',
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'https-calls',
          networkTimeoutSeconds: 15,
          expiration: {
            maxEntries: 150,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
    ],
  },
};

module.exports = withImages(withCSS(withOffline(nextConfig)));
