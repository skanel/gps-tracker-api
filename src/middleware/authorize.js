var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('../config');

/**
 * Authorize middleware function to protect routes that require authentication
 *
 * @param req
 * @param res
 * @param next
 * @version 1.0
 */
module.exports = function (req, res, next) {
  // check header, query params or post parames for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['authorization'];

  if (!token) {
    return res.status(401).json({success: false, message: 'Access token required'});
  }
  try {
    var decoded = jwt.decode(token, config.app.token);
  } catch (err) {
    return res.status(400).json({success: false, message: 'Invalid access token', err: err.toString()});
  }

  if (!moment(decoded.exp).isAfter(moment().format())) {
    return res.status(401).json({success: false, message: 'Access token expired'});
  }

  req.user = decoded.iss;
  next();
};