const faker = require("faker");
const fs = require("fs");

const ROWS = 20;
const zodiacs = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Acquarius",
  "Pisces",
];

let data = [];

for (let i = 1; i < ROWS + 1; i++) {
  let newRow = {};
  newRow.id = i;
  newRow.first_name = faker.name.firstName();
  newRow.last_name = faker.name.lastName();
  newRow.display_name = faker.internet.userName();
  newRow.bio = faker.lorem.paragraph(2);
  newRow.number_of_cats = faker.random.number(10);
  newRow.zodiac =
    zodiacs[Math.floor(Math.random() * Math.floor(zodiacs.length))];
  newRow.zipcode = faker.address.zipCode("#####");
  newRow.avatar = faker.internet.avatar();
  data.push(newRow);
}

console.log(data);
