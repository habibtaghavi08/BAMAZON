var mysql = require("mysql")
var connection =  mysql.createConnection({
    host:"localhost", 
    port : 3306, 
    user:"habib", 
    password:"password",
    database:"bamazon"
})

connection.connect(function(error){
    console.log("connection id"+connection.threadId)
})

require("console.table")
var inquirer = require("inquirer")

function display(){
    connection.query("select * from products", function(error,data){
        console.table(data)
        inquirer.prompt([{
            message:"choose an item number",
            type:"input", 
            name:"itemId"
        },
        
        {
        message:"how many units to you want to purchase",
        type:"input",
        name:"units"
     }

    ]).then(function(input){
        ///do math, data.stock_quantity - input.units then console.log(result)
            display()
        })
        })
        
      