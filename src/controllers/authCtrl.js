var jwt = require('jwt-simple');
var moment = require('moment');

var config = require('../config');
var userRepo = require('../repos/userRepo');
var password = require('../utils/password');

/**
 * Authentication function for the web client, based on username and password
 *
 * @param req {username, password}
 * @param res
 * @version 1.0
 */
module.exports.auth = function (req, res) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({success: false, message: 'Username and password are required'})
  }

  userRepo.getByUsername(req.body.username)
    .then((user) => {
      // thinky's filter method returns an array of documents
      if (!(user.length > 0)) {
        return res.status(401).json({success: false, message: 'Authentication failed. Wrong username or password'})
      }
      user = user[0];
      if (!password.verifyPassword(req.body.password, user.password, user.salt)){
        return res.status(401).json({success: false, message: 'Authentication failed. Wrong username or password'})
      }

      // generate access token
      let tokenData = {id: user.id, username: user.username};
      let exp = moment().add(7, 'days').valueOf();
      let token = jwt.encode({iss: tokenData, exp: exp}, config.app.token);

      return res.json({success: true, token: token});
    })
    .catch((err) => {
      return res.status(400).json({success: false, message: err.toString()})
    })

};