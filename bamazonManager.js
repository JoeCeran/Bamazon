
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
        choices: ["View Products For Sale", "View Low Inventory", 
        "Add to Inventory", "Add New Product"]
        })
      .then(function(answer) {
        if (answer.choice == "View Products For Sale") {
            for (i = 0; i < 5; i++) {
                console.log("Item ID: " + results[i].item_ID);
                console.log("Item Name: " + results[i].product_name);
                console.log("Item Price: " + results[i].price);
                console.log("Item Quantity: " + results[i].stock_quantity);
                console.log("\n");
            }
        }
        else if (answer.choice == "View Low Inventory") {
            // Checks to see if the amount of items is in stock
            for (i = 0; i < 5; i++){
                if (results[i].stock_quantity < 5) {
                console.log(results[i].product_name);
                }
            }   
        }
      });
    })
  }
start();
