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
    password_hash VARCHAR(150) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    phone_number VARCHAR(15) DEFAULT NULL,
    user_level_id INT NOT NULL,
    customer_address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_level_id) REFERENCES UserLevels(level_id)
);

-- Create table for menus
CREATE TABLE Menus (
    menu_id INT AUTO_INCREMENT PRIMARY KEY,
    course_name VARCHAR(50) NOT NULL,
    course_description JSON,
    price DECIMAL(5, 2) NOT NULL,
    menu_image VARCHAR(100),
    category VARCHAR(15) NOT NULL,
    is_special BOOLEAN DEFAULT FALSE
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
    user_id INT,
    customer_name VARCHAR(50) NOT NULL,
    total_price DECIMAL(10, 2),
    order_type ENUM('Pickup', 'Delivery') NOT NULL,
    delivery_address TEXT,
    order_status ENUM('Pending', 'Inprogress', 'Completed', 'Cancelled') DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Create table for order items
CREATE TABLE OrderItems (
    order_item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    menu_id INT NOT NULL,
    course_name VARCHAR(50) NOT NULL,
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
INSERT INTO Menus (course_name, course_description, price, menu_image, category, is_special) VALUES ('Kyoto Bliss', '{"en": "8-piece Spring Petal Roll, 4 pieces of tuna sashimi and wakame salad. Spring Petal Roll: Salmon, avocado and cream cheese wrapped in sushi rice and nori, garnished with sesame seeds.", "fi": "Kevätterälehti-rulla (8kpl), 4 kpl tonnikalasashimia ja wakamesalaattia. Kevätterälehti-rulla: Lohi ja avokado, käärittynä sushiriisiin ja noriin, viimeistelty seesaminsiemenillä."}', 16.90, '/img/menu-images/salmon-avocado-roll2.jpg', 'Lunch', FALSE), ('Hokkaido Harmony', '{"en": "8-piece California Roll, 4 pieces of yellowtail sashimi and edamame beans. California Roll: Creamy avocado, imitation crab, and cucumber rolled in rice and nori, topped with roe and vegan mayonnaise.", "fi": "California-rulla (8 kpl), 4 kpl hamachi-sashimia ja edamame-papuja. California-rulla: Kermainen avokado, surimi ja kurkku, käärittynä riisiin ja noriin, viimeisteltynä mädillä ja vegaanisella majoneesilla."}', 15.90, '/img/menu-images/california-roll2.jpg', 'Lunch', FALSE), ('Ocean Zen Platter', '{"en": "6-piece Flame Roll, 4 pieces of sake nigiri and edamame beans. Flame Roll: Spicy tuna with avocado, wrapped in rice and nori, topped with sesame seeds and spicy vegan mayonnaise.", "fi": "Liekki-rulla (6 kpl), 4 kpl lohi-nigiriä ja edamame-papuja. Liekki-rulla: Tulinen tonnikala ja avokado, käärittynä riisiin ja noriin, viimeisteltynä seesaminsiemenillä ja mausteisella vegaani majoneesilla."}', 18.90, '/img/menu-images/spicy-tuna-maki2.jpg', 'Lunch', TRUE), ('Golden Sun', '{"en": "8-piece Crunchy Shrimp Roll, 2 pieces of unagi nigiri and miso soup. Crunchy Shrimp Roll: Tempura shrimp, avocado, and cucumber wrapped in rice and nori, finished with a drizzle of eel sauce.", "fi": "Rapea katkarapu-rulla (8 kpl), 2 kpl ankerias-nigiriä ja miso keittoa. Rapea katkarapu-rulla: Tempurakatkarapu, avokado ja kurkku, käärittynä riisiin ja noriin, viimeisteltynä ankeriaskastikkeella."}', 19.90, '/img/menu-images/crunchy-shrimp-roll2.jpg', 'Lunch', FALSE), ('Sakura Delight', '{"en": "8-piece Garden Harmony Roll, 4 pieces of tofu nigiri and edamame beans. Garden Harmony Roll: A vibrant mix of red cabbage, wakame salad, carrot, paprika and tofu rolled in rice and nori, topped with sesame seeds.", "fi": "Puutarhan harmonia-rulla (8 kpl), 4 kpl tofu-nigiriä ja edamame-papuja. Värikäs sekoitus punakaalia, wakame-salaattia, porkkanaa, paprikaa ja tofua, käärittynä riisiin ja noriin, päälle ripoteltu seesaminsiemeniä."}', 15.90, '/img/menu-images/vegan-sushi2.jpg', 'Lunch', FALSE), ('Tokyo Trio', '{"en": "8-piece Golden Dragon roll, 2 pieces of maguro nigiri and miso soup. Golden Dragon Roll: White fish, cucumber, and carrot wrapped in sushi rice, topped with freshwater eel, herbs and eel sauce.", "fi": "Kultainen lohikäärme-rulla (8 kpl), 2 kpl tonnikala-nigiriä ja misokeittoa. Kultainen lohikäärme-rulla: Valkoinen kala, kurkku ja porkkana, käärittynä sushiriisiin, päällä makeanveden ankeriasta, yrttejä ja unagikastiketta."}', 19.90, '/img/menu-images/dragon-roll.jpg', 'Lunch', TRUE), ('Moonlight Ocean', '{"en": "6 pieces of unagi nigiri, 3 pieces of sake, ebi, hirame and maguro nigiris, 5 pieces of tako sashimi. Served with wakame salad and warm miso soup.", "fi": "6 kpl ankerias-nigiriä, 3 kpl lohi-, katkarapu-, hirame- ja tonnikala-nigiriä, 5 kpl tako-sashimia. Tarjoillaan wakame-salaatin ja lämpimän misokeiton kanssa."}', 28.90, '/img/menu-images/dinnerplate3.jpg', 'Dinner', TRUE), ('Imperial Feast', '{"en": "2 pieces of sake nigiri, 4 makis of Philadelphia Roll, 8 salmon makis, 5 pieces of salmon sashimi, a bowl of duck ramen soup. Philadelphia Roll: Avocado and cream cheese wrapped in sushi rice and nori, topped with salmon. Ramen soup: Roasted duck slices, ramen noodles, boiled egg, chili oil and herbs", "fi": "2 kpl lohi-nigiriä, 4 Philadelphia-rullan makia, 8 lohi-makia, 5 kpl lohi-sashimia, kulhollinen ankka-ramenkeittoa. Philadelphia-rulla: Avokado ja tuorejuusto, käärittynä sushiriisiin ja noriin, päällä lohta. Ramenkeitto: Paahdettuja ankanviipaleita, ramen-nuudelit, keitetty kananmuna, chilikastiketta ja yrttejä."}', 29.90, '/img/menu-images/dinnerplate7.jpg', 'dinner', FALSE), ('Emperor’s Delight', '{"en": "9 pieces of sake nigiri, 6 pieces of unagi nigiri, 3 pieces of ebi nigiri, 4 makis of Dragon Roll and 2 makis of Philadelphia Roll. Dragon Roll: Salmon, avocado and cream cheese, wrapped in sushi rice and nori, topped with freshwater eel and sesame seeds. Philadelphia Roll: Avocado and cream cheese wrapped in sushi rice and nori, topped with salmon.", "fi": "9 kpl lohi-nigiriä, 6 kpl ankerias-nigiriä, 3 kpl katkarapu-nigiriä,  4 makia lohikäärme-rullaa ja 2 makia Philadelphia-rulla. Lohikäärme-rulla: Lohi, avokado ja tuorejuusto, käärittynä sushiriisiin ja noriin, päällä makeanveden ankeriasta ja seesaminsiemeniä. Philadelphia-rulla: Avokado ja tuorejuusto, käärittynä sushiriisiin ja noriin, päällä lohta."}', 34.90, "/img/menu-images/dinnerplate1.jpg", 'dinner', FALSE), ('Dragon’s Elegance', '{"en": "Combination of freely chosen nigiris, 6 makis of California and Philadelphia roll. California Roll: Creamy avocado, imitation crab, and cucumber rolled in rice and nori, topped with roe and vegan mayonnaise. Philadelphia Roll: Avocado and cream cheese wrapped in sushi rice and nori, topped with salmon.", "fi": "Vapaasti valittavat nigirit, 6 makia Philadelphia- ja California-rullaa. Philadelphia-rulla: Avokado ja tuorejuusto, käärittynä sushiriisiin ja noriin, päällä lohta. California-rulla: Kermainen avokado, surimi ja kurkku, käärittynä riisiin ja noriin, päällä mätiä ja vegaanista majoneesia."}', 42.90, '/img/menu-images/dinnerplate2.jpg', 'dinner', FALSE), ('Harmony Bento', '{"en": "A perfect balance of flavors and textures: Fresh slices of salmon and tuna sashimi, crispy shrimp and vegetable tempura, sweet tamagoyaki, braised tofu, and a selection of simmered vegetables, miso soup, white rice topped with black sesame seeds and a traditional pickled plum.", "fi": "Täydellinen tasapaino makuja ja tekstuureita: Tuoretta lohi- ja tonnikalasashimia. Rapeita katkarapuja ja kasvistempuraa, makeaa tamagoyakia, haudutettua tofua ja vihanneksia. Misokeittoa, valkoista riisiä, jossa seesaminsiemeniä ja perinteinen suolattu luumu."}', 28.90, '/img/menu-images/bento-box.jpg', 'dinner', FALSE), ('Deluxe Fusion Bento', '{"en": "Combination of Japanese classics: Sake, unagi and ebi nigiris, cucumber and salmon makis, salmon and tuna sashimi. Sliced breaded chicken cutlet and prawns, garnished with green onions. Wakame salad, steamed white rice and edamame beans.", "fi": "Yhdistelmä japanilaisia klassikoita: Lohi-, ankerias- ja katkarapu-nigirit, kurkku- ja lohi-makit, lohi- ja tonnikalasashimi. Viipaloitua leivitettyä kananleikettä ja katkarapuja, koristeltu kevätsipulilla. Wakame-salaatti, höyrytettyä valkoista riisiä ja edamame-papuja."}', 32.90, '/img/menu-images/bento2.jpg', 'dinner', FALSE), ('Wakame Salad', 
'{"en": "Fresh and tangy seaweed salad, garnished chopped chili and sesame seeds.", "fi": "Raikas ja maukas merileväsalaatti, koristeltu chilillä ja seesamin siemenillä."}', 5.90, '/img/menu-images/wakame-salad.jpg', 'Sides', TRUE), ('Edamame Beans', '{"en": "Steamed and lightly salted soybeans, a perfect snack.", "fi": "Höyrytettyjä soijapapuja kevyesti suolattuna, täydellinen kevyt välipala."}', 4.90, '/img/menu-images/edamame2.png', 'Sides', FALSE), ('Miso Soup', '{"en": "Traditional Japanese soup made with fermented soybean paste, tofu, seaweed, mushrooms and green onions.", "fi": "Perinteinen japanilainen misokeitto, jossa on tofua, merilevää, herkkusieniä ja kevätsipulia."}', 6.90, '/img/menu-images/miso-soup.jpg', 'Sides', FALSE), ('Sake Sashimi', '{"en": "Fresh slices of salmon sashimi, served with wasabi and pickled ginger.", "fi": "5 viipaletta tuoretta ja mehukasta lohisashimia, tarjoillaan wasabin ja pikkelöidyn inkiväärin kanssa."}', 8.90, '/img/menu-images/salmonsashimi.jpg', 'Sides', FALSE), ('Maguro Sashimi', '{"en": "Fresh slices of tuna sashimi, served with wasabi and pickled ginger.", "fi": "5 viipaletta korkealaatuista tonnikalasashimia, tarjoillaan wasabin ja pikkelöidyn inkiväärin kanssa."}', 9.90, '/img/menu-images/tunasashimi.jpg', 'Sides', TRUE), ('Mixed Sashimi Platter', '{"en": "A selection of 16 sashimi slices featuring sake (salmon), maguro (tuna), and hamachi (yellowtail). Perfect for sharing or indulging.", "fi": "16 viipaletta sashimia: lohta (sake), tonnikalaa (maguro) ja hamachia (keltapyrstö). Täydellinen jaettavaksi tai itselle herkutteluun."}', 24.90, '/img/menu-images/sashimiplate.jpg', 'Sides', FALSE), ('Matcha Latte', '{"en": "A creamy and frothy blend of matcha green tea and steamed milk, sweetened with a touch of honey.", "fi": "Kermainen ja kuohkea yhdistelmä matcha-vihreää teetä ja höyrytettyä maitoa, makeutettuna hunajalla."}', 4.90, '/img/menu-images/matchalatte.jpg', 'Drinks', FALSE), ('Green Tea', '{"en": "A classic, soothing cup of traditional Japanese green tea. Made with finely ground tea leaves. Mild, smooth taste with a subtle earthy flavor.", "fi": "Klassinen, rauhoittava kuppi perinteistä japanilaista vihreää teetä. Valmistettu hienoksi jauhetuista teelehdistä, juomassa on mieto ja sileä maku, jossa on hieno maahinen vivahde."}', 3.90, '/img/menu-images/green-tea.jpg', 'Drinks', FALSE), ('Yuzu Lemonade', '{"en": "A refreshing Japanese citrus drink made with yuzu, a tart lemon-like fruit, and lightly sweetened with sugar. Served cold with a splash of soda.", "fi": "Virkistävä japanilainen sitrushedelmäjuoma, jossa on yuzu, kirpeä sitruunamainen hedelmä, ja kevyesti makeutettu sokerilla. Tarjoillaan kylmänä soodan kanssa."}', 3.90, '/img/menu-images/yuzy-lemonade.jpg', 'Drinks', FALSE), ('Asahi Super Dry', '{"en": "A crisp, refreshing Japanese lager with a clean, dry finish. Known for its smooth taste and perfect balance of bitterness.", "fi": "Raikas ja virkistävä japanilainen lager, jolla on puhdas ja kuiva jälkimaku. Tunnetaan sileästä maustaan ja täydellisestä katkeruuden tasapainosta"}', 6.90, '/img/menu-images/asahi.jpg', 'Drinks', FALSE), ('Sapporo Premium Beer', '{"en": "A well-known Japanese lager that has a slightly malty sweetness with a crisp, refreshing finish. Perfect for those who prefer a slightly richer beer.", "fi": "Tunnettu japanilainen lager, jossa on tasapainoinen ja sileä maku. Pieni maltaisen makeus yhdistyy raikkaaseen ja virkistävään jälkimakuun. Täydellinen niille, jotka arvostavat hieman täyteläisempää olutta."}', 7.90, '/img/menu-images/sapporo3.jpg', 'Drinks', FALSE), ('Sake', '{"en": "A traditional Japanese rice wine with a smooth, clean taste and a slightly sweet finish. Served chilled in a small ceramic cup.", "fi": "Perinteinen japanilainen riisiviini, jossa on sileä ja puhdas maku sekä kevyt makea jälkimaku. Tarjoillaan viileänä pienessä keramiikkamukissa."}', 7.90, '/img/menu-images/sake3.jpg', 'Drinks', FALSE), ('Matcha Tiramisu', '{"en": "A Japanese twist on the classic tiramisu, with layers of delicate matcha-flavored cream and soft cake batter soaked in green tea.", "fi": "Japanilainen versio klassisesta tiramisusta, jossa on kerroksia herkullista matcha-kermaa ja pehmeää kakkutaikinaa, joka on kostutettu vihreällä teellä."}', 7.90, '/img/menu-images/matcha-tiramisu2.jpg', 'Desserts', FALSE), ('Yatsuhashi', '{"en": "A traditional Kyoto-style dessert made with cinnamon-flavored rice dough, often filled with sweet red bean paste or matcha.", "fi": "Perinteinen Kioton alueen herkku, joka on valmistettu kanelimaustetusta riisitaikinasta, usein täytettynä makealla punapaputahnalla tai matchalla."}', 5.90, '/img/menu-images/yatsuhashi.jpg', 'Desserts', FALSE), ('Shirokama', '{"en": "A lighter, fluffier version of the traditional cheesecake, with a smooth texture and a subtle sweet flavor. Made with cream cheese and a touch of citrus zest.", "fi": "Keveämpi ja kuohkeampi versio perinteisestä juustokakusta, jossa on sileä rakenne ja miedon makea maku. Valmistettu tuorejuustosta ja ripauksella sitruunankuorta."}', 7.90, 'img/menu-images/cheese-cake.jpg', 'Desserts', FALSE), ('Kohaku Jelly', '{"en": "A delicate and refreshing jelly made from agar, with a layer of red bean paste and sweet syrup. Served chilled, offering a sweet, slightly chewy texture and smooth finish.", "fi": "Herkullinen ja raikas hyytelö, joka on valmistettu agarista, punapaputahnasta ja makeasta siirapista. Tarjoillaan viileänä, tarjoten makean, hieman sitkeän rakenteen ja sileän jälkimaun."}', 5.90, '/img/menu-images/jelly.jpg', 'Desserts', FALSE), ('Uji Kintoki', '{"en": "A sweet, refreshing dessert made with shaved ice topped with sweet red bean paste, syrup, and matcha powder.", "fi": "Makea ja raikas jälkiruoka, joka on valmistettu höylätyllä jäällä, joka on päällystetty makealla punapaputahnalla, siirapilla ja matchajauheella."}', 6.90, '/img/menu-images/uji-kintoki2.jpg', 'Desserts', FALSE), ('Black Sesame Cheesecake', '{"en": "A rich and creamy cheesecake infused with the nutty, earthy flavor of roasted black sesame seeds, served with a berry compote.", "fi": "Rikas ja kermaisa juustokakku, joka on maustettu paahdetuilla mustilla seesaminsiemenillä ja tarjoillaan marjahillon kanssa."}', 7.90, '/img/menu-images/sesameseed-cheesecake.jpg', 'Desserts', TRUE);


-- Insert allergens
INSERT INTO Allergens (menu_id, allergen_description) VALUES 
(1, 'F, M'), (2, 'F'), (3, 'F, G, S'), (4, 'F, G, S'), (5, 'S'), (6, 'F, S'), (7, 'F'), (8, 'E, F, G, S'), (9, 'F, G, S'), (10, 'F, M, S'), (11, 'F, G, S'), (12, 'F, G, S'), (13, 'S'), (14, 'S'), (15, 'S'), (16, 'F'), (17, 'F'), (18, 'F'), (19, 'M'), (22, 'G'), (23, 'G'), (25, 'E, G, M'), (26, 'G'), (27, 'E, G, M'), (29, 'S'), (30, 'E, G, M');

-- Insert reservations
INSERT INTO Reservations (user_id, reservation_date, reservation_time, guests) VALUES (2, '2021-12-24', '18:00:00', '2'), (3, '2021-12-25', '19:00:00', '4'), (1, '2021-12-26', '20:00:00', '6');

-- Insert food reviews
INSERT INTO FoodReview (user_id, menu_id, review, star_rating) VALUES (2, 1, 'Best sushi in town!', 5), (3, 2, 'Fresh and delicious!', 4), (1, 3, 'Great value for money!', 5);

-- Insert restaurant reviews
INSERT INTO RestaurantReview (user_id, review, star_rating) VALUES (2, 'Great service!', 5), (3, 'Nice atmosphere!', 4), (1, 'Good location!', 4);

/*
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