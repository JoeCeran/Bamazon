DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  item_ID INT NOT NULL,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10,4) NULL,
  stock_quantity VARCHAR(100) NULL,
  product_sales_column DECIMAL(10,4) NULL
);

CREATE TABLE departments (
  department_id INT NOT NULL,
  department_name VARCHAR(100) NULL,
  over_head_costs DECIMAL(10,4) NULL
);

INSERT INTO products (item_ID, product_name, department_name, price, stock_quantity)
VALUES ("1", "Korg MS-20", "Music Equipment", 500.00, 2);

INSERT INTO products (item_ID, product_name, department_name, price, stock_quantity)
VALUES ("2", "Roland SH-101", "Music Equipment", 700.00, 1);

INSERT INTO products (item_ID, product_name, department_name, price, stock_quantity)
VALUES ("3", "Yamaha SY77", "Music Equipment", 300.00, 5);

INSERT INTO products (item_ID, product_name, department_name, price, stock_quantity)
VALUES ("4", "Amazon Kindle", "E-Reader", 130.00, 7);

