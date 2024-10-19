PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS category;

CREATE TABLE category (
    id INTEGER PRIMARY KEY,
    name VARCHAR(50));

INSERT INTO category (name)
VALUES ('vêtement'),('voiture'),('autre');

DROP TABLE IF EXISTS ad;

CREATE table ad (
    id INTEGER PRIMARY KEY,
    title VARCHAR(80) NOT NULL,
    description TEXT,
    price INT,
    picture VARCHAR(150) DEFAULT 'image.jpg',
    location VARCHAR(45),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    category_id INT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES category(id));

INSERT INTO ad (title, description, price, picture, location, category_id)
VALUES 
    ('T-shirt Nike', 'A brand new Nike T-shirt in various sizes.', 1999, 'image1.jpg', 'Paris', 1),
    ('Winter Jacket', 'Heavy-duty winter jacket perfect for cold weather.', 5999, 'image2.jpg', 'Lyon', 1),
    ('Jeans', 'Classic blue jeans, available in all sizes.', 2999, 'image3.jpg', 'Bordeaux', 1),
    ('Leather Shoes', 'High-quality leather shoes, stylish and durable.', 7999, 'image4.jpg', 'Paris', 1),
    ('Sunglasses', 'Trendy sunglasses with UV protection.', 1599, 'image5.jpg', 'Lyon', 1),
    
    ('Toyota Corolla', 'Reliable and fuel-efficient Toyota Corolla in good condition.', 1099999, 'image6.jpg', 'Paris', 2),
    ('BMW 3 Series', 'Luxury BMW 3 Series with low mileage.', 2599999, 'image7.jpg', 'Bordeaux', 2),
    ('Audi A4', 'Audi A4 with excellent performance and handling.', 2199999, 'image8.jpg', 'Lyon', 2),
    ('Honda Civic', 'Well-maintained Honda Civic, perfect for city driving.', 999999, 'image9.jpg', 'Paris', 2),
    ('Tesla Model S', 'Electric Tesla Model S with autopilot feature.', 3599999, 'image10.jpg', 'Lyon', 2),
    
    ('Smartphone', 'Latest model smartphone with all the modern features.', 49999, 'image11.jpg', 'Paris', 3),
    ('Laptop', 'High-performance laptop suitable for gaming and work.', 89999, 'image12.jpg', 'Lyon', 3),
    ('Bicycle', 'Mountain bike in excellent condition.', 14999, 'image13.jpg', 'Bordeaux', 3),
    ('Gaming Console', 'Next-gen gaming console with 1TB storage.', 34999, 'image14.jpg', 'Paris', 3),
    ('Watch', 'Luxury wristwatch with sapphire glass.', 69999, 'image15.jpg', 'Lyon', 3),
    
    ('Backpack', 'Durable backpack suitable for school or travel.', 2499, 'image16.jpg', 'Bordeaux', 1),
    ('Convertible', 'Sporty convertible car, ready for summer driving.', 2799999, 'image17.jpg', 'Paris', 2),
    ('Smart TV', '50-inch Smart TV with 4K resolution.', 54999, 'image18.jpg', 'Lyon', 3),
    ('Dress', 'Elegant evening dress in various colors.', 4999, 'image19.jpg', 'Paris', 1),
    ('Electric Scooter', 'Compact electric scooter with a long battery life.', 19999, 'image20.jpg', 'Bordeaux', 3);

-- SELECT * FROM ad WHERE location Like 'Bordeaux';

-- DELETE FROM ad WHERE price > 4000;

-- UPDATE ad SET price = 0 WHERE strftime('%m', createdAt) = '09' AND strftime('%d', createdAt) = '01';
-- UPDATE ad SET price = 0 WHERE createdAt LIKE '%-09-25%';

-- SELECT ROUND(AVG(price) / 100.0, 2) AS prix_moyen FROM ad WHERE location LIKE 'Paris';

-- SELECT AVG(price) / 100, location FROM ad GROUP BY location;

-- UPDATE ad SET location = 'Villeurbanne' WHERE id = 2;

SELECT * FROM ad WHERE category_id = 1;
SELECT * FROM ad WHERE category_id = 1 OR category_id = 2;

SELECT AVG(price) / 100, name FROM ad INNER JOIN category ON category_id = category.id WHERE category_id = 3;

SELECT * FROM ad INNER JOIN category ON category_id = category.id WHERE name LIKE 'v%';

SELECT * FROM ad;
SELECT * FROM category;

.schema