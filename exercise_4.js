//Notice that for the previous exercise, Account #5 did not appear in the listing. Don’t come back here until you have re-checked 
//the previous exercise and noticed for yourself that Account #5 is missing.

//The reason for this is because Account #5 does not have any AddressBook, so doing the JOIN left it out.
//Read and understand this article on SQL JOINs, more specifically about the LEFT JOIN.
//Based on your new understanding, create a similar program to Exercise #4.

var mysql = require('mysql');
var colors = require('colors');

var connection = mysql.createConnection({
  host     : process.env.IP,
  user     : process.env.C9_USER,
  password : '',
  database : 'addressbook'
});

var accounts = connection.query("select Account.id as accountId, Account.email, AddressBook.id as abId, AddressBook.name from Account left join AddressBook on Account.id=AddressBook.accountId;", function(err, results) {
    if (err){
        return "Error";
    }
    else{
        results.forEach(function(item){
            if (item.abId === null){
                console.log((( "#" + item.accountId + ":" + item.email).bold) + '\n');
                console.log ("No address books");
            }
            else {
                console.log((("#" + item.accountId + ":" + item.email).bold) + '\n' + item.name + '\n');
            }
 
        });
        }
    });
connection.end();