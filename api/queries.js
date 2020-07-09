const { Pool } = require("pg");
// const { response } = require("express");
const md5 = require("md5");
const db = new Pool({
  user: "dev",
  host: "localhost",
  database: "galvanize_dating_app",
  password: "dev-password",
  port: 5432,
});

let response = {};
response.message = "ERROR";
response.data = [];

const getUsers = (req, res) => {
  let query = req.params.userid
    ? db.query("SELECT * FROM account WHERE id = $1 ORDER BY id ASC", [
        Number(req.params.userid),
      ])
    : db.query("SELECT * FROM account ORDER BY id ASC");

  // This DOES NOT work but I don't know why....#TODO: Figure out why this doesn't work
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
      response.message = "OK";
      response.data = results.rows;
      res.status(200).send(response);
    })
    .catch((err) => {
      response.message = "No data found";
      response.data = err;
      res.status(204).send(response);
    });
};

const postUser = (req, res, next) => {
  let user = req.body;
  let userProps = [
    "first_name",
    "last_name",
    "email",
    "password",
    "display_name",
  ];
  for (let key of userProps) {
    if (!user[key] || user[key] === "") {
      response.message = "ERROR - All fields must have a value";
      response.data = [];
      res.status(400).send(response);
      return;
    }
  }

  //   #TODO: Add check for exisiting user by email
  db.query(
    "INSERT INTO account (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING id",
    [user.first_name, user.last_name, user.email, md5(user.password)]
  )
    .then((result) => {
      if (result.rowCount === 1) {
        return db.query(
          "INSERT INTO profile (id, display_name) VALUES ($1, $2)",
          [result.rows[0].id, user.display_name]
        );
      }
    })
    .then((result) => res.status(200).send("Account created"))
    .catch((err) => {
      response.message = "ERROR";
      response.data = err.message;
      res.status(400).send(response);
    });
};

const putUser = (req, res) => {
  let id = req.params.userid;
  let body = req.body;
  if (!id) {
    console.log("should respond with", response);
    res.status(204).send(response);
  }
  // get user from db based on id
  db.query("SELECT * FROM account WHERE id = $1", [Number(id)])
    .then((result) => {
      //if user exists (ie. db returns a row)
      if (result.rowCount === 1) {
        let user = result.rows[0];
        // iterate through body to find the fields provided to be udpated
        for (let fieldToUpdate in body) {
          //if property is in user object then update it...prevent bad fields being provided
          if (Object.keys(user).includes(fieldToUpdate)) {
            user[fieldToUpdate] = body[fieldToUpdate];
          }
        }
        return db.query(
          "UPDATE account SET first_name = $1, last_name = $2, email = $3, password = $4 WHERE id = $5 RETURNING id, first_name, last_name, email",
          [user.first_name, user.last_name, user.email, user.password, user.id]
        );
      } else {
        response.message = "ERROR - User with that ID not found";
        res.status(404).send(response);
      }
    })
    .then((result) => {
      response.message =
        "Updated user: " +
        result.rows[0].id +
        " - " +
        result.rows[0].first_name;
      res.status(200).send(response);
    });
};

const deleteUser = (req, res) => {
  let id = req.params.userid;
  if (!id) {
    console.log("should respond with", response);
    res.status(204).send(response);
  }
  // get user from db based on id
  db.query("SELECT * FROM account WHERE id = $1", [Number(id)])
    .then((result) => {
      //if user exists (ie. db returns a row)
      if (result.rowCount === 1) {
        if (result.rows[0].deactivated === true) {
          response.message = "user is already deactivated";
          res.status(200).send(response);
          return "alreadyDeactivated"; // #REFACTOR: Find a better way to break out of the promise and exit function
        }
        return db.query(
          "UPDATE account SET deactivated = true, deactivated_at = now() WHERE id = $1 RETURNING id, deactivated, deactivated_at",
          [Number(id)]
        );
      } else {
        response.message = "ERROR - User with that ID not found";
        res.status(404).send(response);
      }
    })
    .then((result) => {
      if (result === "alreadyDeactivated") {
        return true;
      }
      response.message = "OK";
      response.data = result.rows[0];
      res.status(200).send(response);
    })
    .catch((err) => res.status(400).send(err));
};

const getProfile = (req, res) => {
  let id = req.params.userid;
  if (!id) {
    // #FIXME Doesn't provide this response if no id is provided
    console.log("should respond with", response);
    res.status(404).send(response);
  }

  db.query(
    "SELECT profile.*, a.first_name, a.last_name, a.email, a.deactivated FROM profile JOIN account AS a ON profile.id = a.id WHERE profile.id = $1;",
    [Number(id)]
  ).then((result) => {
    if (result.rowCount === 1) {
      response.message = "OK";
      response.data = result.rows;
      res.status(200).send(response);
    } else {
      response.message = "ERROR - User with that ID not found";
      response.data = [];
      res.status(404).send(response);
    }
  });
};

const putProfile = (req, res) => {
  let id = req.params.userid;
  let body = req.body;
  if (!id) {
    console.log("should respond with", response);
    res.status(204).send(response);
  }
  // get user from db based on id
  db.query("SELECT * FROM profile WHERE id = $1", [Number(id)])
    .then((result) => {
      //if user exists (ie. db returns a row)
      if (result.rowCount === 1) {
        let user = result.rows[0];
        // iterate through body to find the fields provided to be udpated
        for (let fieldToUpdate in body) {
          //if property is in user object then update it...prevent bad fields being provided
          if (Object.keys(user).includes(fieldToUpdate)) {
            user[fieldToUpdate] = body[fieldToUpdate];
          }
        }
        return db.query(
          "UPDATE profile SET display_name = $1, avatar = $2, bio = $3, number_of_cats = $4, zodiac = $5, zipcode = $6 WHERE id = $7 RETURNING *",
          [
            user.display_name,
            user.avatar,
            user.bio,
            user.number_of_cats,
            user.zodiac,
            user.zipcode,
            user.id,
          ]
        );
      } else {
        response.message = "ERROR - User with that ID not found";
        res.status(404).send(response);
      }
    })
    .then((result) => {
      response.message = "Updated user: " + result.rows[0].id;
      response.data = result.rows;
      res.status(200).send(response);
    });
};
const userLogin = (req, res) => {
  let user = req.body;
  let userProps = ["email", "password"];
  for (let key of userProps) {
    if (!user[key] || user[key] === "") {
      response.message = "ERROR - All fields must have a value";
      response.data = [];
      res.status(400).send(response);
      return;
    }
  }
  db.query("SELECT * FROM account WHERE email = $1", [user.email]).then(
    (result) => {
      if (result.rowCount === 1) {
        if (result.rows[0].password === user.password) {
          response.message = "OK";
          response.data = {
            token: md5(user.password + user.email),
            loginSuccess: true,
            userId: result.rows[0].id,
          };
          res.status(200).send(response);
        }
      } else {
        response.message = "ERROR - Invalid username or password";
        res.status(404).send(response);
      }
    }
  );
};

module.exports = {
  getUsers,
  postUser,
  putUser,
  deleteUser,
  getProfile,
  putProfile,
  userLogin,
};
