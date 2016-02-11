//Write a program that fetches all the accounts and their addressbooks.
//Output one line for each account as in Exercise 4, followed by a listing of all the address book names for that account, one per line
//Make the output look nice in any way you like

var mysql = require('mysql');
var colors = require('colors');
var util = require('util');

var connection = mysql.createConnection({
  host     : process.env.IP,
  user     : process.env.C9_USER,
  password : '',
  database : 'addressbook'
});

var accounts = connection.query("select Account.id as Account_id, Account.email, AddressBook.id as AddressBook_id, AddressBook.name from Account join AddressBook on Account.id=AddressBook.accountId", function(err, results) {
    if (err){
        return "Error";
    }
    else{
        
        var ACCOUNTS = {};
        var BOOKS = {};
        
        var newLook = results.reduce(function (acc, current) {
            
            var account = ACCOUNTS[current.Account_id] || (ACCOUNTS[current.Account_id] = {id: current.Account_id, email: current.email, addressbooks: []})
            var book = BOOKS[current.AddressBook_id] || (BOOKS[current.AddressBook_id]= {name: current.name});
            
            if (account.addressbooks.indexOf(book)===-1){
                account.addressbooks.push(book)
            }
            if (acc.indexOf(account)===-1){
                acc.push(account)
            }
            return acc;
        }, [])
        
        console.log(util.inspect(newLook, { depth: 10, colors: true }));
        
        }
    });
    
    
connection.end();