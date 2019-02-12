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

function start() {
  connection.query("SELECT * FROM products", function (err, results, fields) {
    if (err) throw err;
    inquirer
      .prompt({
        name: "choice",
        type: "list",
        message: "What would you like to do?",
        choices: ["View Products Sales by Department", "Create New Department"]
        })
      .then(function(answer) {
        if (answer.choice == "View Products Sales by Department") {
           
            
        }
        else if (answer.choice == "Create New Department") {
          
           
        }
      });
    })
  }
start();
