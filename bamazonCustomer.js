
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
    start();
});
})

function start() {
  connection.query("SELECT * FROM products", function (err, results, fields) {
    for (let i = 0; i < results.length; i++){
      console.log("ID: " + (i + 1) + "\n" + "Item Name: " + results[i].product_name + "\n" + "Price: " + results[i].price);
      console.log("\n");
    }
    inquirer
      .prompt([
        {
        name: "ID",
        type: "input",
        message: "What is the ID of the item you'd like to buy?(Select by ID#)",
        validate: function validateID(name){
          return name !== "";
        }
        },
        {
        name: "Units",
        type: "input",
        message: "How many would you like to buy?",
        validate: function validateID(name){
          return name !== "";
        }
        }
        ])
      .then(function(answer) {
        i = answer.ID - 1;
        if (answer.Units <= results[i].stock_quantity) {
          newQ = results[i].stock_quantity - answer.Units;
          connection.query("UPDATE products SET stock_quantity='" + newQ + "' WHERE item_id='" + answer.ID + "'")
          inquirer
          .prompt({
            name: "choice",
            type: "list",
            message: "Purchased item/s. Your total is " + (results[i].price * answer.Units) + ", do you wish to continue?",
            choices: ["Yes","No"]
            }).then(function(answer) {
            if (answer.choice == "Yes"){
            start();
            }
            else {
            console.log("Goodbye!");
            }
          });
        } else {
          console.log("Insufficient quantity!");
        }
      });
    })
  }
