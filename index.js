var mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyparser.json());

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "8787root",
  database: 'login',
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

app.post('/create_user', function (req, res, next) {
  let sql = "CREATE TABLE IF NOT EXISTS users (id INTEGER NOT NULL AUTO_INCREMENT, fullName VARCHAR(450) NOT NULL, email VARCHAR(250) NOT NULL, password VARCHAR(250) NOT NULL, PRIMARY KEY (id))"
  let sql2 = `INSERT INTO users (fullName, email, password) VALUES ("${req.body.fullName}", "${req.body.signUpMail}", "${req.body.signUpPass}")`;
  con.query(sql, function (err) {
    if (err) throw err;
    con.query(sql2, function (err) {
      if (err) throw err;
      console.log("1 record inserted");
      res.send("success");
    });
  })
})

app.get('/get_users', function (req, res, next) {
  let sql = "CREATE TABLE IF NOT EXISTS users (id INTEGER NOT NULL AUTO_INCREMENT, fullName VARCHAR(450) NOT NULL, email VARCHAR(250) NOT NULL, password VARCHAR(250) NOT NULL, PRIMARY KEY (id))"
  var sql2 = "SELECT email from users";
  con.query(sql, function (err) {
    if (err) throw err;
    con.query(sql2, function (err, result) {
      if (err) throw err;
      res.send(result);
    })
  })
})

app.listen(3000, () => {
  console.log("server running");
})