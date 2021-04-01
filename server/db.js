const spicedPg = require("spiced-pg");

const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/plantmore"
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
    const q = `SELECT id,first_name, last_name, imageUrl, bio FROM users WHERE id = ($1)`;
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
    const q = `SELECT first_name, last_name, imageUrl,id FROM users WHERE first_name ILIKE $1 OR last_name ILIKE $1 LIMIT 3`;
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
    OR (recipient_id = $2 AND sender_id = $1)
    RETURNING *`;
    const params = [sender_id, recipient_id];
    return db.query(q, params);
};

module.exports.acceptFriend = (sender_id, recipient_id) => {
    const q = `UPDATE friendships SET accepted = TRUE
    WHERE (recipient_id = $1 AND sender_id = $2) 
    OR (recipient_id = $2 AND sender_id = $1)
    RETURNING *
    `;
    const params = [sender_id, recipient_id];
    return db.query(q, params);
};

module.exports.getFriendsList = (id) => {
    const q = `SELECT users.id, first_name, last_name, imageUrl, accepted
    FROM friendships
    JOIN users
    ON (accepted = false AND recipient_id = $1 AND sender_id = users.id)
    OR (accepted = true AND recipient_id = $1 AND sender_id = users.id)
    OR (accepted = true AND sender_id = $1 AND recipient_id = users.id)
    `;
    const params = [id];
    return db.query(q, params);
};

module.exports.tenMostRecentMessages = () => {
    const q = `SELECT chatroom.id, chatroom.sender_id, chatroom.created_at, chatroom.message, users.first_name, users.last_name, users.imageUrl
    FROM chatroom
    JOIN users 
    ON users.id = chatroom.sender_id
    ORDER BY created_at DESC limit 10`;
    return db.query(q);
};

//chat
module.exports.newMessage = (sender_id, message) => {
    const q = `INSERT INTO chatroom (sender_id, message)
    VALUES ($1, $2)
    RETURNING id, created_at`;
    const params = [sender_id, message];
    return db.query(q, params);
};

//chat
module.exports.infoNewMessage = (id) => {
    const q = `SELECT id,first_name, last_name, imageUrl FROM users WHERE id = ($1)`;
    const params = [id];
    return db.query(q, params);
};

//online
module.exports.getUsersByIds = (arrayOfIds) => {
    const q = `SELECT id, first_name, last_name, imageUrl FROM users WHERE id = ANY($1)`;
    const params = [arrayOfIds];
    return db.query(q, params);
};

module.exports.favoritePlant = (userId, apiId, imageUrl, common_name) => {
    const q = `INSERT INTO plants (userId, apiId, imageUrl, common_name)
    VALUES ($1, $2, $3, $4)
    RETURNING id`;
    const params = [userId, apiId, imageUrl, common_name];
    return db.query(q, params);
};

module.exports.checkFavoritePlants = (userId) => {
    const q = `SELECT * FROM plants WHERE userId = ($1)`;
    const params = [userId];
    return db.query(q, params);
};

module.exports.getInfoPlant = (apiId) => {
    const q = `SELECT * FROM availablePlants where apiId = ($1)`;
    const params = [apiId];
    return db.query(q, params);
};

module.exports.sendInfoPlant = (
    userId,
    apiId,
    imageUrl,
    common_name,
    nick_name,
    note,
    age,
    ownImage, 
    location
) => {
    const q = `INSERT INTO availablePlants (userId, apiId, imageurl, common_name, nick_name, note, age, ownimage, location)
    VALUES ($1, $2, $3, $4, $5, $6, $7,$8, $9)
    RETURNING id`;
    const params = [userId, apiId, imageUrl, common_name, nick_name, note, age, ownImage, location];
    return db.query(q, params);
};

module.exports.checkOfferedPlants = (userId) => {
    const q = `SELECT * FROM availablePlants WHERE userId = ($1)`;
    const params = [userId];
    return db.query(q, params);
};

module.exports.infoOfferedPlants = (apiId) => {
    const q = `SELECT * FROM availablePlants where apiId = ($1)`;
    const params = [apiId];
    return db.query(q, params);
};


module.exports.recentPM = (sender_id, recipient_id) => {
    const q = `(SELECT privateMessaging.sender_id, privateMessaging.recipient_id, privateMessaging.message, privateMessaging.created_at, users.imageurl, users.first_name, users.last_name
        FROM privateMessaging
        JOIN users
        ON privateMessaging.sender_id = users.id
        WHERE privateMessaging.sender_id = ($1) AND privateMessaging.recipient_id = ($2)
        OR privateMessaging.recipient_id = ($1) AND privateMessaging.sender_id = ($2)
    LIMIT 10)
    ORDER BY privateMessaging.created_at DESC
    `;
    const params = [sender_id, recipient_id];
    return db.query(q, params);
};


//4
module.exports.newPM = (sender_id, recipient_id, message) => {
    const q = `INSERT INTO privateMessaging (sender_id, recipient_id, message)
    VALUES ($1, $2, $3)
    RETURNING id, created_at`;
    const params = [sender_id, recipient_id, message];
    return db.query(q, params);
};

module.exports.deleteWishlist= (id) => {
    const q = `DELETE FROM plants WHERE id = ($1)`;
    const params = [id];
    return db.query(q, params);
};

module.exports.deleteAvailable= (id) => {
    const q = `DELETE FROM availablePlants WHERE id = ($1)`;
    const params = [id];
    return db.query(q, params);
};

