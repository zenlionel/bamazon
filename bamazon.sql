DROP DATABASE IF EXISTS bamazonDB;
CREATE database bamazonDB;

USE bamazonDB;

CREATE TABLE products (
    item_id INT(4) NOT NULL,
    product_name VARCHAR(40) NOT NULL,
    department_name VARCHAR(40) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT(3) NOT NULL,
    PRIMARY KEY(item_id);
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES(0001, 'chocolate', 'food', 3.20, 30),(0002,'vanilla','food',3.10,20),(0003,'nail','hardware',0.50,10),(0004,'hammer','hardware',4.00,10),(0005,'table','hardware',20.00, 5),(0006,'PC','electronics',1000.00,4)(0007,'Mac','electronics',1200.00,4)