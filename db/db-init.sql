# noinspection SqlNoDataSourceInspectionForFile

CREATE DATABASE IF NOT EXISTS advanced_notes_platform CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

USE advanced_notes_platform;

DROP TABLE IF EXISTS roles;

CREATE TABLE roles (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(20) NOT NULL UNIQUE,
    role_description MEDIUMTEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS colors;

CREATE TABLE colors (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    color_name VARCHAR(20) NOT NULL,
    color_code CHAR(7) NOT NULL,
    UNIQUE(color_name, color_code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS tags;

CREATE TABLE tags (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    tag_name VARCHAR(20) NOT NULL UNIQUE,
    tag_description MEDIUMTEXT,
    color_id BIGINT UNSIGNED DEFAULT NULL,
    FOREIGN KEY (color_id)
        REFERENCES colors(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS category_types;

CREATE TABLE category_types (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    type_name VARCHAR(30) NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS categories;

CREATE TABLE categories (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(30) NOT NULL UNIQUE,
    category_type_id BIGINT UNSIGNED DEFAULT NULL,
    category_description MEDIUMTEXT,
    color_id BIGINT UNSIGNED DEFAULT NULL,
    FOREIGN KEY (category_type_id)
        REFERENCES category_types(id),
    FOREIGN KEY (color_id)
        REFERENCES colors(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(60) DEFAULT NULL,
    user_email VARCHAR(30) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    first_name VARCHAR(30) DEFAULT NULL,
    last_name VARCHAR(30) DEFAULT NULL,
    role_id BIGINT UNSIGNED NOT NULL,
    date_created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (username, user_email),
    FOREIGN KEY (role_id)
        REFERENCES roles(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS notes;

CREATE TABLE notes (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    date_created DATETIME DEFAULT CURRENT_TIMESTAMP,
    category_id BIGINT UNSIGNED DEFAULT NULL,
    tag_id BIGINT UNSIGNED DEFAULT NULL,
    note_title VARCHAR(30) NOT NULL,
    note_body LONGTEXT,
    last_edited TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    unique_id VARCHAR(64) DEFAULT NULL,
    UNIQUE (note_title, unique_id),
    FOREIGN KEY (user_id)
        REFERENCES users(id),
    FOREIGN KEY (category_id)
        REFERENCES categories(id),
    FOREIGN KEY (tag_id)
        REFERENCES tags(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*DROP TABLE IF EXISTS note_tags;*/

/*CREATE TABLE note_tags (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    note_id BIGINT UNSIGNED NOT NULL,
    tag_id BIGINT UNSIGNED NOT NULL,
    FOREIGN KEY (note_id)
        REFERENCES notes(id),
    FOREIGN KEY (tag_id)
        REFERENCES tags(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;*/

INSERT INTO roles (role_name, role_description)
VALUES ('Admin', 'Controls the account and virtually possesses all privileges'),
       ('Utilizer', 'Users who are able to create and edit their own notes. Have limited access to features.');

INSERT INTO colors (color_name, color_code)
VALUES ('Default Grey', '#708090');

INSERT INTO category_types (type_name)
VALUES ('None');

INSERT INTO categories (category_name, category_type_id, category_description, color_id)
VALUES ('Uncategorized', 1, 'Does not belong to any particular category.', 1);




