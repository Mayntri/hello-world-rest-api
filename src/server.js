const http = require("http");
const { createTerminus } = require("@godaddy/terminus");
const { logger } = require("@mayntri/hello-world-architecture");
const app = require("./app");
const port = process.env.PORT || 3000;

const server = http.createServer(app);

createTerminus(server, {
  signal: "SIGINT",
  healthChecks: {
    "/healthcheck": () => Promise.resolve("UP"),
  },
  onSignal: () => {
    logger.log("server is starting cleanup");
    return Promise.resolve();
  },
  onShutdown: () => {
    logger.log("cleanup finished, server is shutting down");
  },
});

server.listen(port, () => {
  logger.log("Server started on port: " + port);
});
