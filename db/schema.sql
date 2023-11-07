DROP DATABASE IF EXISTS user_db;

CREATE DATABASE user_db;

USE user_db;

CREATE TABLE user(
    id INT NOT NULL AUTO_INCREMENT,
    nickname varchar(30) NOT NULL,
    password varchar(255) NOT NULL,
    PRIMARY KEY (id)
);