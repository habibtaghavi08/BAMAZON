create database bamazon_1;
use bamazon_1;
create table products(
    item_id  integer not null auto_increment,
    product_name VARCHAR(45),
    department_name VARCHAR(45),
    price decimal(5,2),
    stock_quantity integer,
    primary key(item_id)
);
