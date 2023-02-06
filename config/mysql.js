const mysql = require("mysql");

const connection = mysql.createConnection({
    host:'localhost',
    user:'raiqi',
    password:'difan12345',
    database:'tugaseduwork'
});

module.exports = connection