const bodyParser = require("body-parser");
const { Pool } = require("pg");
const express = require("express");
// const setUp = require("./databaseSetup");
const query = require("./queries");
const app = express();
const PORT = 3010;
const baseURL = "/api/v1/";
//app.use setup
app.use(bodyParser.json());

// custom middleware
const logger = function (req, res, next) {
  console.log(
    `[${new Date().toJSON()}] - ${req.method} ${req.url} ${JSON.stringify(
      req.body
    )}`
  );
  next();
};
const allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  next();
};
app.use(logger);
app.use(allowCrossDomain);

//user routes
app.get(baseURL + "users/", query.getUsers);
app.get(baseURL + "users/:userid", query.getUsers);
app.post(baseURL + "users/", query.postUser);
app.put(baseURL + "users/", query.putUser);
app.put(baseURL + "users/:userid", query.putUser);
app.delete(baseURL + "users/:userid", query.deleteUser);

// profile routes
app.get(baseURL + "users/profile/:userid", query.getProfile);
app.put(baseURL + "users/profile/:userid", query.putProfile);

// login
app.post(baseURL + "users/login", query.userLogin);

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
