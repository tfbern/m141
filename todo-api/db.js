// lib/db.js
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'm141',
  password: 'sml12345'
});
connection.connect();
module.exports = connection;