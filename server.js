const express = require("express");
const next = require("next");
const compression = require("compression");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
	const server = initializeServer();
	loadMiddleware(server);
	serverHandleRoute(server);
	serverListen(server);
});

function initializeServer() {
	return express();
}

function loadMiddleware(server) {
	server.use(compression());
}

function serverHandleRoute(server) {
	server.get("*", (req, res) => {
		return handle(req, res);
	});
}

function serverListen(server) {
	server.listen(port, err => {
		if (err) throw err;
		console.log(`> Ready on http://localhost:${port}`);
	});
}
