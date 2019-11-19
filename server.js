const express = require('express');
const next = require('next');
const compression = require('compression');
const { join } = require('path');
const { parse } = require('url');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = initializeServer();
  handleMiddleware(server);
  handleRoute(server, app);
  handleListen(server);
});

function initializeServer() {
  return express();
}

function handleMiddleware(server) {
  server.use(compression());
}

function handleRoute(server, appVariable) {
  server.get('/service-worker.js', (request, response) => {
    handleServiceWorker(request, response, appVariable);
  });

  server.get('/favicon.ico', (request, response) =>
    response.status(200).sendFile('favicon.ico', { root: __dirname + '/static/images/' }),
  );

  server.get('*', (request, response) => handle(request, response));
}

function handleServiceWorker(request, response, appVariable) {
  const parsedUrl = parse(request.url, true);
  const { pathname } = parsedUrl;
  const filePath = join(__dirname, '.next', pathname);
  appVariable.serveStatic(request, response, filePath);
}

function handleListen(server) {
  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
}
