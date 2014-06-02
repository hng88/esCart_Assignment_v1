create schema SHOPPINGCART;
set schema SHOPPINGCART;


/*Table structure for shopping cart */

CREATE TABLE SHOPPINGCART.items (
    id INT PRIMARY KEY,
    category_id INT NOT NULL,
    name VARCHAR(40),
    price DOUBLE NOT NULL,
    in_cart BOOLEAN NOT NULL
);








