const express = require("express");
const server = express();
const db = require("./data/db");

server.use(express.json());
const posts = require("./posts");
server.use(posts);

const port = 3000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
