var jwt = require('jwt-simple');
var moment = require('moment');

var positionRepo = require('../repos/positionRepo');

module.exports.create = function (req, res) {
  if (!req.body.terminalId || !req.body.lat || !req.body.long) {
    return res.status(400).json({success: false, message: 'Terminal id, latitude and longitude are required'})
  }

  let now = moment().format();
  let positionData = {terminalId: req.body.terminalId, lat: req.body.lat, long: req.body.long, createdAt: now, updatedAt: now};
  positionRepo.create(positionData)
    .then((position) => {
      res.setHeader('Location', '/positions/'+position.id);
      return res.status(201).json({success: true, message: 'Entity created'});
    })
    .catch((err) => {
      return res.status(400).json({success: false, message: err.toString()})
    })
};

module.exports.getById = function (req, res) {
  if (!req.params.positionId) {
    return res.status(400).json({success: false, message: 'Position id required as param'})
  }

  positionRepo.getById(req.params.positionId)
    .then((position) => {
      res.json({success: true, data: position});
    })
    .catch((err) => {
      return res.status(400).json({success: false, message: err.toString()})
    })
};

module.exports.getAll = function (req, res) {
  positionRepo.getAll(req.query)
    .then((positions) => {
      res.json({success: true, data: positions});
    })
    .catch((err) => {
      return res.status(400).json({success: false, message: err.toString()})
    })
};

module.exports.delete = function (req, res) {
  if (!req.params.positionId) {
    return res.status(400).json({success: false, message: 'Position id required as param'})
  }

  positionRepo.delete(req.params.positionId)
    .then(() => {
      return res.json({success: true, message: 'Entity deleted'});
    })
    .catch((err) => {
      return res.status(400).json({success: false, message: err.toString()})
    });
};