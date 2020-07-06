const { Pool } = require("pg");
const fs = require("fs");
const faker = require("faker");
const db = new Pool({
  user: "dev",
  host: "localhost",
  database: "galvanize_dating_app",
  password: "dev-password",
  port: 5432,
});

let users = JSON.parse(fs.readFileSync("../fakeUsers.json"));

let setUpDatabase = () => {
  db.query("DROP TABLE IF EXISTS account, profile CASCADE")
    .then(() => {
      console.log("Dropped tables");
      return db.query(
        "CREATE TABLE account (id serial NOT NULL,first_name VARCHAR(64) NOT NULL,last_name VARCHAR(64) NOT NULL,email VARCHAR(128) NOT NULL,password VARCHAR(32) NOT NULL,creation_date TIMESTAMP DEFAULT Now(),deactivated bool DEFAULT false,deactivated_at TIMESTAMP, PRIMARY KEY (id));"
      );
    })
    .then(() => {
      for (let idx in users) {
        let user = users[idx];
        db.query(
          "INSERT INTO account (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)",
          [
            user.first_name,
            user.last_name,
            faker.internet.email(),
            faker.internet.password(),
          ],
          (err, result) => {
            if (err) {
              console.log(err);
            }
            console.log(`Added ${user.first_name} to account DB`);
          }
        );
      }
    })
    .then(() => {
      return db
        .query(
          'CREATE TABLE "profile" ("id" int REFERENCES account (id) ON DELETE CASCADE,"display_name" VARCHAR(32),"bio" text,"avatar" text,"number_of_cats" int2,"zipcode" varchar(5),"zodiac" VARCHAR(32), PRIMARY KEY ("id"));'
        )
        .then(() => {
          for (let idx in users) {
            let user = users[idx];
            db.query(
              "INSERT INTO profile (id, display_name, bio, number_of_cats, zodiac, zipcode, avatar) VALUES ($1, $2, $3, $4, $5, $6, $7)",
              [
                Number(idx) + 1,
                user.display_name,
                user.bio,
                user.number_of_cats,
                user.zodiac,
                user.zipcode,
                user.avatar,
              ],
              (err, result) => {
                if (err) {
                  console.log(err);
                }
                console.log(
                  `Added profile data for ${user.first_name} to profile DB`
                );
              }
            );
          }
        });
    })
    .catch((err) => console.log(err));
};

module.exports = {
  setUpDatabase,
};

setUpDatabase();
