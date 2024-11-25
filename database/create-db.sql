-- Creating database for Tataki

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
    created_at TIMESTAMP NOT NULL,
    FOREIGN KEY (user_level_id) REFERENCES UserLevels(level_id)
);

-- Create table for menus
CREATE TABLE Menus (
    menu_id INT AUTO_INCREMENT PRIMARY KEY,
    course_name VARCHAR(50) NOT NULL,
    course_description TEXT NOT NULL,
    price DECIMAL(5, 2) NOT NULL,
    menu_image VARCHAR(100),
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
    created_at TIMESTAMP NOT NULL,
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
    created_at TIMESTAMP NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Create table for food reviews
CREATE TABLE FoodReview (
    review_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    menu_id INT NOT NULL,
    review TEXT NOT NULL,
    star_rating TINYINT NOT NULL,
    created_at TIMESTAMP NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (menu_id) REFERENCES Menus(menu_id)
);

-- Create table for restaurant reviews
CREATE TABLE RestaurantReview (
    review_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    review TEXT NOT NULL,
    star_rating TINYINT NOT NULL,
    created_at TIMESTAMP NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Insert user levels
INSERT INTO UserLevels (level_name) VALUES ('Admin'), ('User');

-- Insert users
INSERT INTO Users (username, password_hash, email, phone_number, user_level_id, created_at) VALUES ('ellinoora', 'popokissa', 'elli@metropolia.fi', '0452115710', 1, NULL), ('joel', 'joel123', 'joelii@integral.com', '0453006000', 2, NULL), ('popo', 'popo123', 'popodii@popokissa.fi', '0452006000', 2, NULL);

-- Insert menus
INSERT INTO Menus (course_name, course_description, price, menu_image, category) VALUES 
('Kyoto Bliss', 
'{"en": "8-piece Spring Petal Roll, 4 pieces of tuna sashimi and wakame salad. Spring Petal Roll: Salmon, avocado and cream cheese wrapped in sushi rice and nori, garnished with sesame seeds.", "fi": "Kevätterälehti-rulla (8kpl), 4 kpl tonnikalasashimia ja wakamesalaattia. Kevätterälehti-rulla: Lohi ja avokado, käärittynä sushiriisiin ja noriin, viimeistelty seesaminsiemenillä."}', 16.90, '/img/menu-images/salmon-avocado-roll2.jpg', 'Lunch'),

('Hokkaido Harmony', 
'{"en": "8-piece California Roll, 4 pieces of yellowtail sashimi and edamame beans. California Roll: Creamy avocado, imitation crab, and cucumber rolled in rice and nori, topped with roe and vegan mayonnaise.", "fi": "California-rulla (8 kpl), 4 kpl hamachi-sashimia ja edamame-papuja. California-rulla: Kermainen avokado, surimi ja kurkku, käärittynä riisiin ja noriin, viimeisteltynä mädillä ja vegaanisella majoneesilla."}', 15.90, '/img/menu-images/california-roll2.jpg', 'Lunch'),

('Ocean Zen Platter', 
'{"en": "6-piece Flame Roll, 4 pieces of sake nigiri and edamame beans. Flame Roll: Spicy tuna with avocado, wrapped in rice and nori, topped with sesame seeds and spicy vegan mayonnaise.", "fi": "Liekki-rulla (6 kpl), 4 kpl lohi-nigiriä ja edamame-papuja. Liekki-rulla: Tulinen tonnikala ja avokado, käärittynä riisiin ja noriin, viimeisteltynä seesaminsiemenillä ja mausteisella vegaani majoneesilla."}', 18.90, '/img/menu-images/spicy-tuna-maki2.jpg', 'Lunch'),

('Golden Sun', 
'{"en": "8-piece Crunchy Shrimp Roll, 2 pieces of unagi nigiri and miso soup. Crunchy Shrimp Roll: Tempura shrimp, avocado, and cucumber wrapped in rice and nori, finished with a drizzle of eel sauce.", "fi": "Rapea katkarapu-rulla (8 kpl), 2 kpl ankerias-nigiriä ja miso keittoa. Rapea katkarapu-rulla: Tempurakatkarapu, avokado ja kurkku, käärittynä riisiin ja noriin, viimeisteltynä ankeriaskastikkeella."}', 19.90, '/img/menu-images/crunchy-shrimp-roll2.jpg', 'Lunch'),

('Sakura Delight', 
'{"en": "8-piece Garden Harmony Roll, 4 pieces of tofu nigiri and edamame beans. Garden Harmony Roll: A vibrant mix of red cabbage, wakame salad, carrot, paprika and tofu rolled in rice and nori, topped with sesame seeds.", "fi": "Puutarhan harmonia-rulla (8 kpl), 4 kpl tofu-nigiriä ja edamame-papuja. Värikäs sekoitus punakaalia, wakame-salaattia, porkkanaa, paprikaa ja tofua, käärittynä riisiin ja noriin, päälle ripoteltu seesaminsiemeniä."}', 15.90, '/img/menu-images/vegan-sushi2.jpg', 'Lunch'),

('Tokyo Trio', 
'{"en": "8-piece Golden Dragon roll, 2 pieces of maguro nigiri and miso soup. Golden Dragon Roll: White fish, cucumber, and carrot wrapped in sushi rice, topped with freshwater eel, herbs and eel sauce.", "fi": "Kultainen lohikäärme-rulla (8 kpl), 2 kpl tonnikala-nigiriä ja misokeittoa. Kultainen lohikäärme-rulla: Valkoinen kala, kurkku ja porkkana, käärittynä sushiriisiin, päällä makeanveden ankeriasta, yrttejä ja unagikastiketta."}', 19.90, '/img/menu-images/dragon-roll.jpg', 'Lunch'),

('Wakame Salad', 
'{"en": "Fresh and tangy seaweed salad, garnished chopped chili and sesame seeds.", "fi": "Raikas ja maukas merileväsalaatti, koristeltu chilillä ja seesamin siemenillä."}', 5.90, '/img/menu-images/wakame-salad.jpg', 'Sides'), 

('Edamame Beans', 
'{"en": "Steamed and lightly salted soybeans, a perfect snack.", "fi": "Höyrytettyjä soijapapuja kevyesti suolattuna, täydellinen kevyt välipala."}', 4.90, '/img/menu-images/edamame2.png', 'Sides'), 

('Miso Soup', 
'{"en": "Traditional Japanese soup made with fermented soybean paste, tofu, seaweed, mushrooms and green onions.", "fi": "Perinteinen japanilainen misokeitto, jossa on tofua, merilevää, herkkusieniä ja kevätsipulia."}', 6.90, '/img/menu-images/miso-soup.jpg', 'Sides'), 

('Sake Sashimi', 
'{"en": "Fresh slices of salmon sashimi, served with wasabi and pickled ginger.", "fi": "5 viipaletta tuoretta ja mehukasta lohisashimia, tarjoillaan wasabin ja pikkelöidyn inkiväärin kanssa."}', 8.90, '/img/menu-images/salmonsashimi.jpg', 'Sides'), 

('Maguro Sashimi', 
'{"en": "Fresh slices of tuna sashimi, served with wasabi and pickled ginger.", "fi": "5 viipaletta korkealaatuista tonnikalasashimia, tarjoillaan wasabin ja pikkelöidyn inkiväärin kanssa."}', 9.90, '/img/menu-images/tunasashimi.jpg', 'Sides'),

('Mixed Sashimi Platter', '{"en": "A selection of 16 sashimi slices featuring sake (salmon), maguro (tuna), and hamachi (yellowtail). Perfect for sharing or indulging.", "fi": "16 viipaletta sashimia: lohta (sake), tonnikalaa (maguro) ja hamachia (keltapyrstö). Täydellinen jaettavaksi tai itselle herkutteluun."}', 24.90, '/img/menu-images/sashimiplate.jpg', 'Sides');

-- Insert allergens
INSERT INTO Allergens (menu_id, allergen_description) VALUES 
(1, 'F'), (1, 'M'), (2, 'F'), (3, 'F'), (3, 'G'), (3, 'S'), (4, 'F'), (4, 'G'), (4, 'S'), (5, 'S'), (6, 'F'), (6, 'S');

/*
-- Insert orders
INSERT INTO Orders (user_id, order_type, order_status, created_at) VALUES (2, 'Takeaway', 'Inprogress', NULL), (3, 'Delivery', 'Pending', NULL), (1, 'Delivery', 'Pending', NULL);

-- Insert order items
INSERT INTO OrderItems (order_id, menu_id, item_quantity, comment) VALUES (1, 1, 1, 'Extra wasabi'), (2, 2, 1, 'Extra soy sauce'), (2, 3, 1, 'Extra ginger'), (3, 4, 1, 'Extra wasabi'), (3, 5, 1, 'Extra soy sauce');

-- Insert reservations
INSERT INTO Reservations (user_id, reservation_date, reservation_time, guests, created_at) VALUES (2, '2021-12-24', '18:00:00', '2', NULL), (3, '2021-12-25', '19:00:00', '4', NULL), (1, '2021-12-26', '20:00:00', '6', NULL);

-- Insert food reviews
INSERT INTO FoodReview (user_id, menu_id, review, star_rating, created_at) VALUES (2, 1, 'Best sushi in town!', 5, NULL), (3, 2, 'Fresh and delicious!', 4, NULL), (1, 3, 'Great value for money!', 5, NULL);

-- Insert restaurant reviews
INSERT INTO RestaurantReview (user_id, review, star_rating, created_at) VALUES (2, 'Great service!', 5, NULL), (3, 'Nice atmosphere!', 4, NULL), (1, 'Good location!', 4, NULL);

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