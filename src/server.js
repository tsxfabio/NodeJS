import http from "node:http";
import { json } from "./middleware/json.js";

/* 
Importação feita via CommonJS (usando require)
const http = require("http");
*/

const tasks = [];

const server = http.createServer(async (req, res) => {
  const { method, url } = req;
  await json(req, res);

  if (method === "GET" && url === "/tasks") {
    return res.end(JSON.stringify(tasks));
  }

  if (method === "POST" && url === "/tasks") {
    tasks.push({
      id: 1,
      title: "Primeira Task",
      description: "Adicionando a primeira task na API",
    });

    return res.end();
  }
});

server.listen(3333);
