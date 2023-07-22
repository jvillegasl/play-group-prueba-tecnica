CREATE DATABASE play_group_javl;

use play_group_javl;

CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(400) NOT NULL,
    image_url TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

