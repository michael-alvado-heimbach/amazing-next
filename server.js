const express = require("express");
const next = require("next");
const compression = require("compression");
const { join } = require("path");
const { parse } = require("url");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
	const server = initializeServer();
	loadMiddleware(server);
	serverHandleRoute(server, app);
	serverListen(server);
});

function initializeServer() {
	return express();
}

function loadMiddleware(server) {
	server.use(compression());
}

function serverHandleRoute(server, app) {
	server.get("/service-worker.js", (request, response) => {
		handleServiceWorker(request, response, app);
	});

	server.get("*", (request, response) => {
		return handle(request, response);
	});
}

function handleServiceWorker(request, response, app) {
	const parsedUrl = parse(request.url, true);
	const { pathname } = parsedUrl;
	const filePath = join(__dirname, ".next", pathname);
	app.serveStatic(request, response, filePath);
}

function serverListen(server) {
	server.listen(port, err => {
		if (err) throw err;
		console.log(`> Ready on http://localhost:${port}`);
	});
}
