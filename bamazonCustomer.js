var mysql = require("mysql");
var inquirer = require("inquirer");
var parser = require("body-parser");
var i;

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "Bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  connection.query("SELECT * FROM products", function (err, results, fields) {
    if (err) throw err;
    console.log(results);
    start();
});
})

function start() {
  connection.query("SELECT * FROM products", function (err, results, fields) {
    if (err) throw err;
    inquirer
      .prompt([
        {
        name: "ID",
        type: "input",
        message: "What is the ID of the item you'd like to buy?",
        },
        {
        name: "Units",
        type: "input",
        message: "How many would you like to buy?",
        }
        ])
      .then(function(answer) {
        // Checks to see if the amount of items is in stock
        i = answer.ID - 1;
        if (answer.Units <= results[i].stock_quantity) {
          console.log("Enough quantity!");
        } else {
          console.log("Insufficient quantity!");
        }
      });
    })
  }
