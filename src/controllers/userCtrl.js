var jwt = require('jwt-simple');
var moment = require('moment');

var userRepo = require('../repos/userRepo');
var password = require('../utils/password');

module.exports.create = function (req, res) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({success: false, message: 'Username and password are required'})
  }

  userRepo.getByUsername(req.body.username)
    .then((user) => {
      if (user.length > 0) {
        return res.status(400).json({success: false, message: 'Username already exists'})
      }

      let now = moment().format();
      let hashedPassword = password.hashPassword(req.body.password);
      let userData = {
        username: req.body.username,
        password: hashedPassword.pass,
        salt: hashedPassword.salt,
        createdAt: now,
        updatedAt: now
      };

      userRepo.create(userData)
        .then((user) => {
          res.setHeader('Location', '/users/'+user.id);
          return res.status(201).json({success: true, message: 'Entity created'});
        })

    })
    .catch((err) => {
      return res.status(400).json({success: false, message: err.toString()})
    })
};

module.exports.getById = function (req, res) {
  if (!req.params.userId) {
    return res.status(400).json({success: false, message: 'User id required as param'})
  }

  userRepo.getById(req.params.userId)
    .then((user) => {
      res.json({success: true, data: user});
    })
    .catch((err) => {
      return res.status(400).json({success: false, message: err.toString()})
    })
};

module.exports.getAll = function (req, res) {
  userRepo.getAll()
    .then((users) => {
      res.json({success: true, data: users});
    })
    .catch((err) => {
      return res.status(400).json({success: false, message: err.toString()})
    })
};

module.exports.update = function (req, res) {
  if (!req.params.userId) {
    return res.status(400).json({success: false, message: 'User id required as param'})
  }
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({success: false, message: 'You can update username or password'})
  }
  let updateData = {updatedAt: moment().format()};
  if (req.body.username) {
    userRepo.getByUsername(req.body.username)
      .then((user) => {
        if (user.length > 0) {
          return res.status(400).json({success: false, message: 'Username already exists'})
        }
        Object.assign(updateData, {username: req.body.username});
        if (req.body.password) {
          let hashedPassword = password.hashPassword(req.body.password);
          Object.assign(updateData, {password: hashedPassword.pass, salt: hashedPassword.salt});
        }
        return userRepo.update(req.params.userId, updateData)
          .then((user) => {
            res.setHeader('Location', '/users/'+user.id);
            return res.json({success: true, message: 'Entity updated'});
          })
      })
      .catch((err) => {
        return res.status(400).json({success: false, message: err.toString()})
      });
  }
};

module.exports.delete = function (req, res) {
  if (!req.params.userId) {
    return res.status(400).json({success: false, message: 'User id required as param'})
  }

  userRepo.delete(req.params.userId)
    .then(() => {
      return res.json({success: true, message: 'Entity deleted'});
    })
    .catch((err) => {
      return res.status(400).json({success: false, message: err.toString()})
    });
};