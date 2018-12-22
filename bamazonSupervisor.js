require('dotenv').config();
const cTable = require('console.table');
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
            choices: ["View Product Sales by Department", "Create New Department"]
        }
    ]).then(function (answer) {
        switch (answer.action) {
            case "Create New Department":
                createNewDepartment();
                break;
            case "View Product Sales by Department":
                getProductSalesByDepartment();
                break;
            default:
                return console.log("Not A Valid Command")
        }

    });

}
function getProductSalesByDepartment() {
    console.log("product by department");
    var values = [];
    connection.query("select a.department_id, a.department_name, a.over_head_costs, a.product_sales, (a.over_head_costs - a.product_sales) * -1 as total_profit from(select departments.department_id, departments.department_name, departments.over_head_costs, SUM(products.product_sales) as product_sales from departments INNER JOIN products on departments.department_name = products.department_name GROUP BY department_name, department_id, departments.over_head_costs) a;", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            var items = [];
            items.push(res[i].department_id);
            items.push(res[i].department_name);
            items.push(res[i].over_head_costs);
            items.push(res[i].product_sales);
            items.push(res[i].total_profit);
            values.push(items);
        }
        // connection.end();
        console.table(['department_id', 'department_name', 'over_head_costs', 'product_sales', 'total_profit'], values);

        start();
    });
}

function createNewDepartment(departmentName, overHead) {
    console.log("creating new department");
    inquirer.prompt([

        {
            type: "input",
            name: "departmentName",
            message: "Enter the New Department Name:"
        },
        {
            type: "input",
            name: "overHeadCost",
            message: "Enter the Departments Over Head Cost:"
        }
    ]).then(function (answer) {
        connection.query("INSERT INTO departments (department_name, over_head_costs) VALUES (?, ?);", [answer.departmentName, answer.overHeadCost], function (err, res) {
            if (err) throw err;
            // Log all results of the SELECT statement
            // connection.end();
            start();
        });
    });
    
}
