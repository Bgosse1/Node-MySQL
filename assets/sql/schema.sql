DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(120) NOT NULL,
  department_name VARCHAR(120) NOT NULL,
  price DECIMAL(18,2) NOT NULL,
  stock_quantity INT NOT NULL, 
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Acer - Nitro", "Computers & Tablets", 669.99, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("ASUS - ROG", "Computers & Tablets", 1499.99, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Nintendo Switch", "Video Games", 299.99, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Xbox One", "Video Games", 199.99, 7);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Insignia-40inch Class-LED ", "TV & Home Theater", 169.99, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Samsung-32inch Class-LED", "TV & Home Theater", 259.99, 6);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPhone XS Max", "Cell Phones", 1099.99, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPhone 8 64GB", "Cell Phones", 599.99, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Apple Watch Series 4", "Wearable Technology", 529.00, 16);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Fitbit - Charge 3 Activity Tracker", "Wearable Technology", 129.95, 12);