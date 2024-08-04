//
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mysql",
  database: "userdb",
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL Connected...");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/registerTest.html");
});

// Route
app.post("/users", (req, res) => {
  const { Fullname, Gender, dob, phone } = req.body;
  const user = { Fullname, Gender, dob, phone };

  const query = "INSERT INTO users SET ?";
  db.query(query, user, (err, result) => {
    if (err) throw err;
    res.send(`User registered successfully with ID ${result.insertId}`);
  });
});

app.listen(3000);
