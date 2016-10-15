var thinky = require('../lib/thinky');
var User = require('../models/User');

module.exports.getByUsername = function (username) {
  return User
    .filter({username: username})
    .limit(1)
    .run()
};

module.exports.getById = function (userId) {
  return User
    .get(userId)
    .run()
};

module.exports.getAll = function () {
  return User
    .run()
};

module.exports.create = function (userData) {
  return User.save(userData)
};

module.exports.update = function (userId, userData) {
  return User
    .get(userId)
    .update(userData)
    .run()
};

module.exports.delete = function (userId) {
  return User
    .get(userId)
    .then((user) => {
      return user.delete();
    })
};