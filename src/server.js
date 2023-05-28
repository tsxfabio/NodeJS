import http from "node:http";
import { routes } from "./routes.js";
import { json } from "./middleware/json.js";

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  const route = routes.find((routes) => {
    return routes.method === method && routes.path === url;
  });

  if (route) {
    return route.handler(req, res);
  }

  res.writeHead(404).end();
});

server.listen(3333);
