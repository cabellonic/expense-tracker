CREATE DATABASE expensetracker;

CREATE TABLE IF NOT EXISTS app_user (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20),
    email VARCHAR(50) UNIQUE NOT NULL,
    passhash VARCHAR(255) NOT NULL,
    income NUMERIC(10,2) DEFAULT 0,
    expenses NUMERIC(10,2) DEFAULT 0,
    balance NUMERIC(10,2) DEFAULT 0
);

INSERT INTO app_user (first_name, last_name, email, passhash) VALUES ('John', 'Doe', 'johndoe@mail.com', 'passhash')

CREATE TABLE category (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE,
    user_id BIGINT REFERENCES app_user (id) ON DELETE CASCADE
);

INSERT INTO category (name, slug, user_id) VALUES ('Food', 'food', null);
INSERT INTO category (name, slug, user_id) VALUES ('Salary', 'salary', null);
INSERT INTO category (name, slug, user_id) VALUES ('Sport', 'food', null);
INSERT INTO category (name, slug, user_id) VALUES ('Shopping', 'sport', null);
INSERT INTO category (name, slug, user_id) VALUES ('Travel', 'travel', null);
INSERT INTO category (name, slug, user_id) VALUES ('Streaming', 'streaming', null);
INSERT INTO category (name, slug, user_id) VALUES ('Insurance', 'insurance', null);
INSERT INTO category (name, slug, user_id) VALUES ('Healthcare', 'healthcare', null);
INSERT INTO category (name, slug, user_id) VALUES ('Bills', 'bills', null);
INSERT INTO category (name, slug, user_id) VALUES ('GYM', 'gym', null);
INSERT INTO category (name, slug, user_id) VALUES ('Clothes', 'clothes', null);
INSERT INTO category (name, slug, user_id) VALUES ('Education', 'education', null);
INSERT INTO category (name, slug, user_id) VALUES ('Gift', 'gift', null);
INSERT INTO category (name, slug, user_id) VALUES ('Decoration', 'decoration', null);
INSERT INTO category (name, slug, user_id) VALUES ('Gaming', 'gaming', null);

CREATE TABLE transaction (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    amount NUMERIC(10,2) NOT NULL,
    title VARCHAR(255) NOT NULL,
    note TEXT,
    type VARCHAR(255) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    category_id INTEGER REFERENCES category (id) ON DELETE CASCADE,
    user_id BIGINT REFERENCES app_user (id) ON DELETE CASCADE
);