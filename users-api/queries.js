const { Pool } = require("pg");
const db = new Pool({
  user: "dev",
  host: "localhost",
  database: "galvanize_dating_app",
  password: "dev-password",
  port: 5432,
});

const getUsers = (req, res) => {
  console.log("Running getUsers");

  db.query("SELECT * FROM account ORDER BY id ASC")
    .then((results) => {
      let response = {};
      response.message = "OK";
      response.data = results.rows;
      res.status(200).send(response);
    })
    .catch((err) => {
      let response = {};
      response.message = "No data found";
      response.data = err;
      res.status(204).send(response);
    });
};

module.exports = {
  getUsers,
};
