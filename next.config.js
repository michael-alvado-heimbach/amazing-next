const withCSS = require('@zeit/next-css');
// const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const withOffline = require('next-offline');

module.exports = withOffline(
  withCSS({
    cssModules: true,
    webpack: config => {
      // config.plugins.push(serviceWorkerSetup());

      const originalEntry = config.entry;
      config.entry = async () => {
        const entries = await originalEntry();
        return polyfillSetup(entries);
      };

      return config;
    },
  }),
);

// function serviceWorkerSetup() {
//   const setup = new SWPrecacheWebpackPlugin({
//     verbose: true,
//     staticFileGlobsIgnorePatterns: [/\.next\//],
//     runtimeCaching: [
//       {
//         handler: 'networkFirst',
//         urlPattern: /^https?.*/,
//       },
//     ],
//   });
//   return setup;
// }

async function polyfillSetup(entries) {
  if (entries['main.js'] && !entries['main.js'].includes('./utils/polyfills.js')) {
    entries['main.js'].unshift('./utils/polyfills.js');
  }
  return entries;
}
