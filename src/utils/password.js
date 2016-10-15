var hash = require('node_hash');
var crypto = require('crypto');

module.exports.hashPassword = function (plainPassword) {
  let salt = crypto.randomBytes(128).toString('base64');
  return {
    pass: hash.sha512(plainPassword, salt),
    salt: salt
  }
};

module.exports.verifyPassword = function (enteredPassword, databasePassword, salt) {
  var hashedEnteredPassword = hash.sha512(enteredPassword, salt);
  return (hashedEnteredPassword === databasePassword)
};