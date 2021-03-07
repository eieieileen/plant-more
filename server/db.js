const spicedPg = require("spiced-pg");

const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/socialnetwork"
);

module.exports.addUser = (first_name, last_name, email, password_hash) => {
    const q = `INSERT INTO users (first_name, last_name, email, password_hash)
    VALUES ($1, $2, $3, $4)
    RETURNING id
    `;
    const params = [first_name, last_name, email, password_hash];
    return db.query(q, params);
};