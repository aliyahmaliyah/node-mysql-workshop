//Write a program that fetches all the databases in MySQL and prints them nicely on the screen.
var mysql = require('mysql');
var colors = require('colors');
var Table = require('cli-table');

var table = new Table({
    head: ['Database', 'Database Name']
  , colWidths: [30,30]
});

var connection = mysql.createConnection({
  host     : process.env.IP,
  user     : process.env.C9_USER,
  password : '',
  database : 'addressbook'
});

var databases = connection.query("show databases", function(err, results) {
    if (err){
        return "Error";
    }
    else{
        results.forEach(function(item){
            table.push(item);
        });
        console.log(table.toString());
    }
});
connection.end();