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
var totalPurchase = 0
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
    //  .then statemenet

    ]).then(function(input){
      var statement =   connection.query("select * from products where item_id =?", input.itemId,function(error,data){

                    var updatedQuantity= data[0].stock_quantity - input.units
                    if (updatedQuantity > 0){

                        var price = data[0].price

                        connection.query("update products set stock_quantity = ? where item_id = ?", [updatedQuantity, input.itemId], function(error,data){
                                         
                                     totalPurchase = totalPurchase + (input.units *price)
                                     console.log("total purchase is", totalPurchase)
                                     display()
                                     
                        }) 
                    }
                   else{
                       console.log("Insufficient Quantity")
                       display()
                   }
                   
                        


                    


         })

        ///do math, data.stock_quantity - input.units then console.log(result)
           
        })
        })
        
    }
        
    display()