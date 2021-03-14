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

module.exports.insertSecretCode = (email, code) => {
    const q = `INSERT INTO reset_codes (email, code)
    VALUES ($1, $2)
    RETURNING id
    `;
    const params = [email, code];
    return db.query(q, params);
};

module.exports.findSecretCode = (email, code) => {
    const q = `SELECT * FROM reset_codes
  WHERE CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes'
  AND email = ($1)
  AND code = ($2)`;
    const params = [email, code];
    return db.query(q, params);
};

module.exports.updatePassword = (password, email) => {
    const q = `UPDATE users 
    SET password_hash = ($1)
    WHERE email = ($2)`;
    const params = [password, email];
    return db.query(q, params);
};

module.exports.getProfileInfo = (id) => {
    const q = `SELECT first_name, last_name, imageUrl, bio FROM users WHERE id = ($1)`;
    const params = [id];
    return db.query(q, params);
};

module.exports.addPic = (imageUrl, id) => {
    const q = `UPDATE users SET imageUrl = ($1)
    WHERE id = ($2)`;
    const params = [imageUrl, id];
    return db.query(q, params);
};

module.exports.addBio = (bio, id) => {
    const q = `UPDATE users SET bio = ($1)
    WHERE id = ($2)`;
    const params = [bio, id];
    return db.query(q, params);
};

module.exports.getInfoOtherUser = (id) => {
    const q = `SELECT first_name, last_name, bio, imageUrl FROM users WHERE id = ($1)`;
    const params = [id];
    return db.query(q, params);
};