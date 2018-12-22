DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(120) NOT NULL,
  department_name VARCHAR(120) NOT NULL,
  price DECIMAL(18,2) NOT NULL,
  stock_quantity INT NOT NULL, 
  product_sales DECIMAL(18,2) NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Acer - Nitro", "Computers & Tablets", 669.99, 5, 0.00);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("ASUS - ROG", "Computers & Tablets", 1499.99, 3, 0.00);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Nintendo Switch", "Video Games", 299.99, 2, 0.00);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Xbox One", "Video Games", 199.99, 7, 0.00);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Insignia-40inch Class-LED ", "TV & Home Theater", 169.99, 10, 0.00);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Samsung-32inch Class-LED", "TV & Home Theater", 259.99, 6, 0.00);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("iPhone XS Max", "Cell Phones", 1099.99, 25, 0.00);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("iPhone 8 64GB", "Cell Phones", 599.99, 20, 0.00);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Apple Watch Series 4", "Wearable Technology", 529.00, 16, 0.00);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Fitbit - Charge 3 Activity Tracker", "Wearable Technology", 129.95, 12, 0.00);

CREATE TABLE departments (
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(120) NOT NULL,
  over_head_costs DECIMAL(18,2) NOT NULL,
  PRIMARY KEY (department_id)
);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Computers & Tablets", 1000);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Video Games", 500);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("TV & Home Theater", 1500);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Cell Phones", 2000);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Wearable Technology", 3000);
