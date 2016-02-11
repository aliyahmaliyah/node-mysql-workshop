//Write a program that fetches all the accounts and their addressbooks.
//Output one line for each account as in Exercise 4, followed by a listing of all the address book names for that account, one per line
//Make the output look nice in any way you like

var mysql = require('mysql');
var colors = require('colors');

var connection = mysql.createConnection({
  host     : process.env.IP,
  user     : process.env.C9_USER,
  password : '',
  database : 'addressbook'
});

var accounts = connection.query("select * from Account join AddressBook on Account.id=AddressBook.accountId group by Account.id", function(err, results) {
    if (err){
        return "Error";
    }
    else{
        results.forEach(function(item){
            console.log((("#" + item.id + ":" + item.email).bold) + '\n' + item.name + '\n');
        })
        }
    });
connection.end();