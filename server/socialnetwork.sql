DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS reset_codes;
DROP TABLE IF EXISTS friendships;
DROP TABLE IF EXISTS chatroom;

CREATE TABLE users (
    id            SERIAL PRIMARY KEY,
    first_name    VARCHAR NOT NULL CHECK (first_name <> ''),
    last_name     VARCHAR NOT NULL CHECK (last_name <> ''),
    email         VARCHAR NOT NULL UNIQUE CHECK (email <> ''),
    password_hash VARCHAR NOT NULL CHECK (password_hash <> ''),
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    imageUrl      VARCHAR,
    bio VARCHAR(500)

);

CREATE TABLE reset_codes(
    id SERIAL PRIMARY KEY,
    email VARCHAR NOT NULL,
    code VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);




CREATE TABLE friendships( 
    id SERIAL PRIMARY KEY, 
    sender_id INT REFERENCES users(id) NOT NULL, 
    recipient_id INT REFERENCES users(id) NOT NULL, 
    accepted BOOLEAN DEFAULT false 
);

CREATE TABLE chatroom(
    id SERIAL PRIMARY KEY,
    sender_id INT REFERENCES users(id) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    message VARCHAR(500)
);

-- MUST BE WITH SINGLE FUCKING QUOTESSSS
INSERT INTO chatroom (sender_id, message) VALUES (2, 'Hi how are yaaaaaa');
INSERT INTO chatroom (sender_id, message) VALUES (4, 'Fine and you??');
INSERT INTO chatroom (sender_id, message) VALUES (7, 'Good! I havent had corona yet');
INSERT INTO chatroom (sender_id, message) VALUES (27, 'Yea me neither');
