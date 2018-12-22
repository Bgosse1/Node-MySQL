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
    start();
});


function start() {
    inquirer.prompt([
        {
            type: "list",
            name: "action",
            message: "Please Select an Option",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        }
    ]).then(function (answer) {
        switch (answer.action) {
            case "View Products for Sale":
                getProducts();
                break;
            case "View Low Inventory":
                getLowInventory();
                break;
            case "Add to Inventory":
                addInventory();
                break;
            case "Add New Product":
                addNewProduct();
                break;
            default:
                return console.log("Not A Valid Command")
        }
    });
}

function getProducts() {
    console.log("get products");
    connection.query("select products.item_id, products.product_name, products.price, products.stock_quantity from products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("Item ID: " + res[i].item_id);
            console.log("Name: " + res[i].product_name);
            console.log("Price: " + res[i].price);
            console.log("Stock: " + res[i].stock_quantity + "\n-----------------------------------------");
        }
        //connection.end();
        start();
    });
}

function getLowInventory() {
    console.log("Inventory less than 5");
    connection.query("select products.item_id, products.product_name, products.price, products.stock_quantity from products where products.stock_quantity < 5", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("Item ID: " + res[i].item_id);
            console.log("Name: " + res[i].product_name);
            console.log("Price: " + res[i].price);
            console.log("Stock: " + res[i].stock_quantity + "\n-----------------------------------------");
        }
        //connection.end();
        start();
    });
}

function addInventory() {
    console.log("add inventory");
    inquirer
        .prompt([
            {
                name: "productID",
                type: "input",
                message: "What is the product ID of the item you would like to add more off?",
                // validate: function (value) {
                //     productIdExists = false;
                //     if (/^\d+$/.test(value)) {
                //         for (var i = 0; i < products.length; i++) {
                //             if (products[i].item_id === parseInt(value)) {
                //                 productIdExists = true;
                //             }
                //         }
                //         if (productIdExists === false) {
                //             return console.log("\n Please Enter a Valid ID.")
                //         }
                //     }
                //     else {
                //         return console.log("\n Please Enter a Valid ID.")
                //     }
                //     return productIdExists;
                // }
            },
            {
                name: "quantity",
                type: "input",
                message: "how many units of the product would you like to add?",
                // validate: function (value) {
                //     validNumber = false;
                //     if (/^\d+$/.test(value)) {
                //         validNumber = true;
                //     }
                //     else {
                //         return console.log("\n Please Enter a Valid Quantity.")
                //     }
                //     return productIdExists;
                // }
            },
        ])
        .then(function (answer) {
            let userQty = parseInt(answer.quantity);

            updateProductInventory(answer.productID, userQty);

        });
}

function addNewProduct() {
    console.log("add new product");
    inquirer.prompt([

        {
            type: "input",
            name: "productname",
            message: "Enter the Product Name:"
        },
        {
            type: "input",
            name: "departmentname",
            message: "Enter the Department Name:"
        },
        {
            type: "input",
            name: "price",
            message: "Enter the Price:"
        },
        {
            type: "input",
            name: "quantity",
            message: "Enter the quantity:"
        }

    ]).then(function (answer) {
        connection.query("insert into products (product_name, department_name, price, stock_quantity) VALUES (?, ?, ? ,?)", [answer.productname, answer.departmentname, answer.price, answer.quantity], function (err, res) {
            if (err) throw err;
            connection.end();
            return console.log("New product inserted");
        });
    });
}

function updateProductInventory(id, qty) {
    connection.query("update products set products.stock_quantity = ? where products.item_id = ?", [qty, id], function (err, res) {
        if (err) throw err;
        connection.end();
        return console.log("updated store qty");
    });
}