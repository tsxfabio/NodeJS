import http from "node:http";

/* 
Importação feita via CommonJS (usando require)
const http = require("http");
*/

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World");
});

server.listen(3333);
