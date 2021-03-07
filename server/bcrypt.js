const { genSalt, hash, compare } = require("bcryptjs");

module.exports.compare = compare;

module.exports.hash = (password_hash) =>
    genSalt().then((salt) => hash(password_hash, salt));
