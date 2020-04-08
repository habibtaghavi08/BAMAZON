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

function display(){
    connection.query("select * from products", function(error,data){
        console.table(data)
    })
}

display()