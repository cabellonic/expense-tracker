CREATE DATABASE expensetracker;

CREATE TABLE IF NOT EXISTS app_user (
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(20) NOT NULL,
    lastname VARCHAR(20) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    income NUMERIC(10,2) DEFAULT 0,
    expenses NUMERIC(10,2) DEFAULT 0,
    balance NUMERIC(10,2) DEFAULT 0
);

INSERT INTO app_user (first_name, lastname, email, password) VALUES ('John', 'Doe', 'johndoe@mail.com', 'password')

CREATE TABLE category (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    user_id BIGINT REFERENCES app_user (id) ON DELETE CASCADE
);

INSERT INTO category (name, slug, created_at, updated_at, user_id) VALUES ('Food', 'food', '2020-01-01 00:00:00', '2020-01-01 00:00:00');

CREATE TABLE transaction (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE,
    note TEXT,
    amount NUMERIC(10,2) NOT NULL,
    type VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    category_id INTEGER REFERENCES category (id) ON DELETE CASCADE,
    user_id BIGINT REFERENCES app_user (id) ON DELETE CASCADE
);