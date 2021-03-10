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

module.exports.checkPassword = (email) => {
    const q = `SELECT password_hash, id FROM users WHERE email = ($1)`;
    const params = [email];
    return db.query(q, params);
};

module.exports.insertSecretCode = (id, email, code, created_at) => {
    const q = `INSERT INTO reset_codes (id, email, code, created_at)
    VALUES ($1, $2, $3, $4)
    RETURNING id
    `;
    const params = [id, email, code, created_at];
    return db.query(q, params);
};

module.exports.findSecretCode = () => {
    const q = `SELECT * FROM reset_codes
  WHERE CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes'`;
    return db.query(q);
};

module.exports.updatePassword = (password, id) => {
    const q = `UPDATE users 
    SET password_hash = ($1)
    WHERE id = ($2)`;
    const params = [password, id];
    return db.query(q, params);
};