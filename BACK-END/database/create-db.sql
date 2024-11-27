-- Creating database for Tataki

-- karri: source C:/Users/karri/OneDrive/Documents/Project-fall2024/BACK-END/database/create-db.sql;


DROP DATABASE IF EXISTS tataki;
CREATE DATABASE tataki;
USE tataki;

-- Create table for user levels
CREATE TABLE UserLevels (
    level_id INT AUTO_INCREMENT PRIMARY KEY,
    level_name VARCHAR(15) NOT NULL
);

-- Create table for users
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(15) NOT NULL UNIQUE,
    password_hash VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    phone_number VARCHAR(15) NOT NULL,
    user_level_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_level_id) REFERENCES UserLevels(level_id)
);

-- Create table for menus
CREATE TABLE Menus (
    menu_id INT AUTO_INCREMENT PRIMARY KEY,
    course_name VARCHAR(50) NOT NULL,
    course_description TEXT NOT NULL,
    price DECIMAL(5, 2) NOT NULL,
    category VARCHAR(15) NOT NULL
);

-- Create table for allergens
CREATE TABLE Allergens (
    allergen_id INT AUTO_INCREMENT PRIMARY KEY,
    menu_id INT NOT NULL,
    allergen_description VARCHAR(50) NOT NULL,
    FOREIGN KEY (menu_id) REFERENCES Menus(menu_id) 
);

-- Create table for orders
CREATE TABLE Orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    order_type VARCHAR(50) NOT NULL,
    order_status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Create table for order items
CREATE TABLE OrderItems (
    order_item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    menu_id INT NOT NULL,
    item_quantity INT NOT NULL,
    comment TEXT,
    FOREIGN KEY (order_id) REFERENCES Orders(order_id),
    FOREIGN KEY (menu_id) REFERENCES Menus(menu_id)
);

-- Create table for reservations
CREATE TABLE Reservations (
    reservation_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    reservation_date DATE NOT NULL,
    reservation_time TIME NOT NULL,
    guests VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Create table for food reviews
CREATE TABLE FoodReview (
    review_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    menu_id INT NOT NULL,
    review TEXT NOT NULL,
    star_rating TINYINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (menu_id) REFERENCES Menus(menu_id)
);

-- Create table for restaurant reviews
CREATE TABLE RestaurantReview (
    review_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    review TEXT NOT NULL,
    star_rating TINYINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);


-- Insert user levels
INSERT INTO UserLevels (level_name) VALUES ('Admin'), ('User');

-- Insert users
INSERT INTO Users (username, password_hash, email, phone_number, user_level_id) VALUES ('ellinoora', 'popokissa', 'elli@metropolia.fi', '0452115710', 1), ('joel', 'joel123', 'joelii@integral.com', '0453006000', 2), ('popo', 'popo123', 'popodii@popokissa.fi', '0452006000', 2);

-- Insert menus
INSERT INTO Menus (course_name, course_description, price, category) VALUES ('Dragonroll', '8 pieces of maki', 11.95, 'Lunch'), 
('Salmon nigiri', '6 pieces of nigiri', 9.95, 'Lunch'), 
('California roll', '8 pieces of maki', 10.95, 'Lunch'), 
('Sashimi', '6 pieces of sashimi', 12.95, 'Dinner'), 
('Flower set', '6 pieces of nigiri and 6 pieces of maki', 13.95, 'Dinner'), 
('Sakura set', '6 pieces of nigiri and 8 pieces of maki', 14.95, 'Dinner'),
('Miso Soup', 'Miso soup with tofu of prawn', 4.50, 'Sides'), 
('Gyoza', '6 Gyozas', 5.95, 'Sides'), 
('Edamame', 'Edamame beans', 3.95, 'Sides'), 
('Mochee', 'Mochi ice cream', 4.95, 'Desserts'), 
('Green tea cake', 'Green tea cake', 3.95, 'Desserts'), 
('Asahi', 'Asahi beer', 5.95, 'Drinks'), 
('Sake', 'Sake', 6.95, 'Drinks'), 
('Coca Cola', 'Coca Cola', 2.95, 'Drinks');

-- Insert allergens
INSERT INTO Allergens (menu_id, allergen_description) VALUES (1, 'Gluten'), (1, 'Soy'), (1, 'Fish'), (2, 'Fish'), (3, 'Soy'), (3, 'Fish'), (4, 'Fish'), (5, 'Soy'), (6, 'Gluten'), (6, 'Soy'), (6, 'Fish'), (7, 'Soy'), (8, 'Gluten'), (10, 'Gluten'), (10, 'Milk'), (11, 'Gluten'), (11, 'Egg'), (12, 'Alcohol'), (13, 'Alcohol'), (14, 'Caffeine');

-- Insert orders
INSERT INTO Orders (user_id, order_type, order_status) VALUES (2, 'Takeaway', 'Inprogress'), (3, 'Delivery', 'Pending'), (1, 'Delivery', 'Pending');

-- Insert order items
INSERT INTO OrderItems (order_id, menu_id, item_quantity, comment) VALUES (1, 1, 1, 'Extra wasabi'), (2, 2, 1, 'Extra soy sauce'), (2, 3, 1, 'Extra ginger'), (3, 4, 1, 'Extra wasabi'), (3, 5, 1, 'Extra soy sauce');

-- Insert reservations
INSERT INTO Reservations (user_id, reservation_date, reservation_time, guests) VALUES (2, '2021-12-24', '18:00:00', '2'), (3, '2021-12-25', '19:00:00', '4'), (1, '2021-12-26', '20:00:00', '6');

-- Insert food reviews
INSERT INTO FoodReview (user_id, menu_id, review, star_rating) VALUES (2, 1, 'Best sushi in town!', 5), (3, 2, 'Fresh and delicious!', 4), (1, 3, 'Great value for money!', 5);

-- Insert restaurant reviews
INSERT INTO RestaurantReview (user_id, review, star_rating) VALUES (2, 'Great service!', 5), (3, 'Nice atmosphere!', 4), (1, 'Good location!', 4);


-- Query to get menu items by category
SELECT * FROM Menus WHERE category = 'Lunch';
SELECT * FROM Menus WHERE category = 'Dinner';
SELECT * FROM Menus WHERE category = 'Sides';
SELECT * FROM Menus WHERE category = 'Desserts';
SELECT * FROM Menus WHERE category = 'Drinks';

-- Query to get all menus and their allergens
SELECT 
    Menus.course_name, 
    Menus.course_description, 
    Menus.price, 
    Menus.category, 
    GROUP_CONCAT(Allergens.allergen_description SEPARATOR ', ') AS allergens
FROM Menus
LEFT JOIN Allergens ON Menus.menu_id = Allergens.menu_id
GROUP BY Menus.menu_id;

-- Query to get all orders with order items, including the total price of the order
SELECT 
    Orders.order_id, 
    Orders.order_type, 
    Orders.order_status, 
    Orders.created_at, 
    Users.username, 
    GROUP_CONCAT(
        CONCAT(Menus.course_name, ' (Qty: ', OrderItems.item_quantity, ')')
        ORDER BY OrderItems.order_item_id
        SEPARATOR '; '
    ) AS order_items,
    (SELECT SUM(Menus.price * OrderItems.item_quantity)
     FROM OrderItems 
     JOIN Menus ON OrderItems.menu_id = Menus.menu_id 
     WHERE OrderItems.order_id = Orders.order_id) AS total_order_price
FROM Orders
JOIN Users ON Orders.user_id = Users.user_id
JOIN OrderItems ON Orders.order_id = OrderItems.order_id
JOIN Menus ON OrderItems.menu_id = Menus.menu_id
GROUP BY Orders.order_id, Orders.order_type, Orders.order_status, Orders.created_at, Users.username;

-- Query to get all reservations with user information
SELECT 
    Reservations.reservation_id, 
    Reservations.reservation_date, 
    Reservations.reservation_time, 
    Reservations.guests, 
    Reservations.created_at, 
    Users.username
FROM Reservations
JOIN Users ON Reservations.user_id = Users.user_id;

-- Query to get all food reviews with user information
SELECT 
    FoodReview.review_id, 
    FoodReview.review, 
    FoodReview.star_rating, 
    FoodReview.created_at, 
    Users.username, 
    Menus.course_name
FROM FoodReview
JOIN Users ON FoodReview.user_id = Users.user_id
JOIN Menus ON FoodReview.menu_id = Menus.menu_id;

-- Query to get all restaurant reviews with user information
SELECT 
    RestaurantReview.review_id, 
    RestaurantReview.review, 
    RestaurantReview.star_rating, 
    RestaurantReview.created_at, 
    Users.username
FROM RestaurantReview 
JOIN Users ON RestaurantReview.user_id = Users.user_id;

-- updating menu item price
/*
UPDATE Menus
SET price = 12.95
WHERE course_name = 'Dragonroll';

-- updating order status to completed

UPDATE Orders
SET order_status = 'Completed'
WHERE order_id = 1;

-- updating reservation time

UPDATE Reservations
SET reservation_time = '19:00:00'
WHERE reservation_id = 1;

-- deleting a menu item

DELETE FROM Menus
WHERE course_name = 'Green tea cake';

-- deleting a reservation

DELETE FROM Reservations
WHERE reservation_id = 1;
*/