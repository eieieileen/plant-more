DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS reset_codes;
DROP TABLE IF EXISTS friendships;

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

INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES (1,42,TRUE);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES (124,1,false);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES (1,26,TRUE);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES (1,25,TRUE);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES (1,23,TRUE);