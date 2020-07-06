const bodyParser = require("body-parser");
const { Pool } = require("pg");
const express = require("express");
// const setUp = require("./databaseSetup");
const query = require("./queries");
const app = express();
const PORT = 3000;
const db = new Pool({
  user: "dev",
  host: "localhost",
  database: "galvanize_dating_app",
  password: "dev-password",
  port: 5432,
});

app.use(bodyParser.json());

app.get("/users/", query.getUsers);

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
