require('dotenv').config();
var inquirer = require("inquirer");
var mysql = require("mysql");
var keys = require("./assets/javascript/keys.js");
var mysqlPassword = keys.mysql.password;
var mysqlUser = keys.mysql.user;

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: mysqlUser,
    password: mysqlPassword,
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    getProducts();
});

function start(products) {
    inquirer
        .prompt([
            {
                name: "productID",
                type: "input",
                message: "What is the product ID of the item you would like to buy?",
                validate: function (value) {
                    productIdExists = false;
                    if (/^\d+$/.test(value)) {
                        for (var i = 0; i < products.length; i++) {
                            if (products[i].item_id === parseInt(value)) {
                                productIdExists = true;
                            }
                        }
                        if (productIdExists === false) {
                            return console.log("\n Please Enter a Valid ID.")
                        }
                    }
                    else {
                        return console.log("\n Please Enter a Valid ID.")
                    }
                    return productIdExists;
                }
            },
            {
                name: "quantity",
                type: "input",
                message: "how many units of the product would you like to buy?",
                validate: function (value) {
                    validNumber = false;
                    if (/^\d+$/.test(value)) {
                        validNumber = true;
                    }
                    else {
                        return console.log("\n Please Enter a Valid Quantity.")
                    }
                    return productIdExists;
                }
            },
        ])
        .then(function (answer) {
            let userQty = parseInt(answer.quantity);
            
            checkQty(answer.productID, userQty);

        });
}

function getProducts() {
    console.log("Selecting all products...\n");
    connection.query("select products.item_id, products.product_name, products.price from products", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        for (var i = 0; i < res.length; i++) {
            console.log("Item ID: " + res[i].item_id);
            console.log("Name: " + res[i].product_name);
            console.log("Price : " + res[i].price + "\n-----------------------------------------");
        }
        // connection.end();
        start(res);
    });
}

function checkQty(id, userQty) {
    connection.query("select products.item_id, products.stock_quantity, products.price, products.product_sales from products where products.item_id = ?", [id], function (err, res) {
        if (err) throw err;
        let itemQty = res[0].stock_quantity;
        let itemPrice = res[0].price;
        let productSales = res[0].product_sales;
        if( itemQty < userQty){
            console.log("Insufficient quantity!");
            getProducts();
        }
        else{
            var qtyLeft = itemQty - userQty;
            productSales += (userQty * itemPrice);
            var totalSale = userQty * itemPrice;
            console.log("Your total cost is: " + totalSale);
            updateProductQty(id, qtyLeft, productSales);
        }

    });
}

function updateProductQty(id, qty, productSales){
    connection.query("update products set products.stock_quantity = ?, products.product_sales = ? where products.item_id = ?", [qty, productSales, id], function (err, res) {
        if (err) throw err;
        connection.end();
        return console.log("updated store qty");
        
    });
}
