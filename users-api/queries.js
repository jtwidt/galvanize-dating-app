const { Pool } = require("pg");
const { response } = require("express");
const db = new Pool({
  user: "dev",
  host: "localhost",
  database: "galvanize_dating_app",
  password: "dev-password",
  port: 5432,
});

const getUsers = (req, res) => {
  let query = req.params.userid
    ? db.query("SELECT * FROM account WHERE id = $1 ORDER BY id ASC", [
        Number(req.params.userid),
      ])
    : db.query("SELECT * FROM account ORDER BY id ASC");

  // This DOES NOT work but I don't know why....TODO: Figure out why this doesn't work
  //   let id = req.params.userid;
  //   if (id) {
  //     let query = db.query(
  //       "SELECT * FROM account WHERE id = $1 ORDER BY id ASC",
  //       [Number(req.params.userid)]
  //     );
  //   } else {
  //     let query = db.query("SELECT * FROM account ORDER BY id ASC");
  //   }

  query
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

const postUser = (req, res) => {
  let user = req.body;
  db.query(
    "INSERT INTO account (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)",
    [user.first_name, user.last_name, user.email, user.password]
  )
    .then((results) => {
      let response = {};
      if (results.rowCount === 1) {
        res.status(200).send("Account created");
      }
    })
    .catch((err) => {
      response.message = "ERROR";
      response.data = err;
    });
};

module.exports = {
  getUsers,
  postUser,
};
