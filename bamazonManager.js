
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
            for (i = 0; i < results.length; i++) {
                console.log("Item ID: " + results[i].item_ID);
                console.log("Item Name: " + results[i].product_name);
                console.log("Item Price: " + results[i].price);
                console.log("Item Quantity: " + results[i].stock_quantity);
                console.log("\n");
            }
            start();
        }
        else if (answer.choice == "View Low Inventory") {
            // Checks to see if the amount of items is in stock
            for (i = 0; i < results.length; i++){
                if (results[i].stock_quantity < 5) {
                console.log(results[i].product_name);
                }
            }  
            start() 
        }
        else if (answer.choice == "Add to Inventory") {
        
          inquirer
          .prompt([
            {
            name: "ID",
            type: "input",
            message: "What is the ID of the item you'd like to add stock to?",
            validate: function validateID(name){
              return name !== "";
            }
            },
            {
            name: "Units",
            type: "input",
            message: "How much would you like to add?",
            validate: function validateID(name){
              return name !== "";
            }
            }
            ]).then(function(answer) {
            i = answer.ID - 1;
            stock = Number(answer.Units);
            newQ = Number(results[i].stock_quantity) + stock;
            connection.query("UPDATE products SET stock_quantity='" + newQ + "' WHERE item_id='" + answer.ID + "'")
            console.log("Product Stock Updated!");
            start();
          });
        }
        else if (answer.choice == "Add New Product") {
          inquirer
          .prompt([
            {
            name: "Name",
            type: "input",
            message: "What is the name of the item you'd like to add?",
            validate: function validateID(name){
              return name !== "";
            }
            },
            {
            name: "Department",
            type: "input",
            message: "what is the department?",
            validate: function validateID(name){
              return name !== "";
            }
            },
            {
            name: "Price",
            type: "input",
            message: "what is the price?",
            validate: function validateID(name){
              return name !== "";
            }
            },
            {
            name: "Units",
            type: "input",
            message: "what is the stock?",
            validate: function validateID(name){
              return name !== "";
            }
            }
            ]).then(function(answer) {

            var query = connection.query("INSERT INTO products SET ?",
              {
              item_ID: (results.length + 1),
              product_name: answer.Name,
              department_name: answer.Department,
              price: answer.Price,
              stock_quantity: answer.Units
              },
              function(err, res) {
                console.log(res.affectedRows + " product inserted!\n");
                // Call updateProduct AFTER the INSERT completes
              }
              
            );
            start();
          }
      )};
    })
  })
}
start();
