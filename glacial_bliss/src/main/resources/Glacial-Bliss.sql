CREATE DATABASE glacialbliss;
USE glacialbliss;

/*Create a User Table-*/
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL
);

SELECT * FROM users;

/*Create the products table*/
CREATE TABLE products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DOUBLE NOT NULL,
    imageUrl VARCHAR(100)
);

SELECT * FROM products;


/* Create the orders table with foreign keys referencing users and products*/
CREATE TABLE orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    quantity INT NOT NULL,
    totalPrice DOUBLE NOT NULL,
    product_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

SELECT * FROM orders;
DESCRIBE TABLE orders;


COMMIT;
