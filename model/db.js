const mysql = require("mysql");
const config = require("../config/db.config.js");

const connection = mysql.createConnection({
  host: config.HOST,
  user: config.USER,
  password: config.PASSWORD,
  database: config.DB
});

connection.connect(error => {
  if (error) {
      console.log(error);
      throw error;
  }
  console.log("Successfully connected to the database.");
});

module.exports = connection;