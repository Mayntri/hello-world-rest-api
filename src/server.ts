import http from "http";
import { createTerminus } from "@godaddy/terminus";
import { logger } from "@mayntri/hello-world-architecture";
import app from "./app";
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
    return Promise.resolve();
  },
});

server.listen(port, () => {
  logger.log("Server started on port: " + port);
});
