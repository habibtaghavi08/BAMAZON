// connecting mysql database to my terminal via 
var mysql = require("mysql")

// gets the login credentials 
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "habib",
    password: "password",
    database: "bamazon_1"
})

// uses the login credential to connect to MySql dataBase
connection.connect(function (error) {
    console.log("connection id" + connection.threadId)
})

// sums up total purchases on the table
var totalPurchase = 0

// display better look and feel of table of MySql on the Terminal 
require("console.table")
// function someone wrote from the terminal "inquirer" gets the number of units and item number  
var inquirer = require("inquirer")

function display() {
    connection.query("select * from products", function (error, data) {
        console.table(data)
        // prompts messages to customer about choosing an item # as well as How many units they want
        inquirer.prompt([{
                message: "PLEASE CHOOSE AN ITEM NUMBER",
                type: "input",
                name: "itemId"
            },

            {
                message: "HOW MANY UNITS WOULD YOU LIKE TO PURCHASE",
                type: "input",
                name: "units"
            }
            //  (.then statement) dot then statement gets the data from terminal and does the math to update quantity and gets the total purchase correct

        ]).then(function (input) {
            var statement = connection.query("select * from products where item_id =?", input.itemId, function (error, data) {
           ///do math, data.stock_quantity - input.units then console.log(result)
                var updatedQuantity = data[0].stock_quantity - input.units
                if (updatedQuantity > 0) {

                    var price = data[0].price

                    connection.query("update products set stock_quantity = ? where item_id = ?", [updatedQuantity, input.itemId], function (error, data){

                        totalPurchase = totalPurchase + (input.units * price)
                        console.log("YOUR TOTAL PURCHASE AMOUNT IS:", totalPurchase)
                        display()

                    })
                } else {
                    console.log("Insufficient Quantity")
                    display()
                }







            })

           

        })
    })

}

display()