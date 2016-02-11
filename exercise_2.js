//Write a program that fetches the first 5 accounts in the addressbook database
//For each account, console.log a line with the account’s ID and email, like this: #1:email@domain.com
//Use the colors NPM module with the .bold option to achieve this effect

var mysql = require('mysql');
var colors = require('colors');

var connection = mysql.createConnection({
  host     : process.env.IP,
  user     : process.env.C9_USER,
  password : '',
  database : 'addressbook'
});

var emails = connection.query("select id, email from Account limit 5", function(err, results) {
    if (err){
        return "Error";
    }
    else{
        results.forEach(function(item){
            console.log(("#" + item.id + ":" + item.email).bold);
        })
    }
});
connection.end();
