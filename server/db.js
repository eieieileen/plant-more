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

module.exports.mostRecent = () => {
    const q = `SELECT * FROM users ORDER BY id DESC LIMIT 3`;
    return db.query(q);
};

module.exports.findUsers = (val) => {
    const q = `SELECT first_name, last_name FROM users WHERE first_name ILIKE $1 OR last_name ILIKE $1 LIMIT 5`;
    const params = [val + "%"];
    return db.query(q, params);
};

module.exports.checkFriends = (sender_id, recipient_id) => {
    const q = `SELECT * FROM friendships 
    WHERE (recipient_id = $1 AND sender_id = $2) 
    OR (recipient_id = $2 AND sender_id = $1)`;
    const params = [sender_id, recipient_id];
    return db.query(q, params);
};

module.exports.friendRequest = (sender_id, recipient_id) => {
    const q = `INSERT INTO friendships (sender_id, recipient_id)
    VALUES ($1, $2)
    RETURNING *`;
    const params = [sender_id, recipient_id];
    return db.query(q, params);
};

module.exports.deleteFriend = (sender_id, recipient_id) => {
    const q = `DELETE FROM friendships 
    WHERE (recipient_id = $1 AND sender_id = $2) 
    OR (recipient_id = $2 AND sender_id = $1)`;
    const params = [sender_id, recipient_id];
    return db.query(q, params);
};

module.exports.acceptFriend = (sender_id, recipient_id) => {
    const q = `UPDATE friendships SET accepted = TRUE
    WHERE (recipient_id = $1 AND sender_id = $2) 
    OR (recipient_id = $2 AND sender_id = $1)`;
    const params = [sender_id, recipient_id];
    return db.query(q, params);
};