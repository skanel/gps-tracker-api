var thinky = require('../lib/thinky');
var Position = require('../models/Position');

module.exports.getAll = function (query) {
  let promise = Position;
  if (query.terminalId) {
    promise = promise.filter({terminalId: query.terminalId})
  }
  if (query.startDate) {
    promise = promise.filter((position) => {
      return position("createdAt").ge(query.startDate)
    })
  }

  if (query.endDate) {
    promise = promise.filter((position) => {
      return position("createdAt").le(query.endDate)
    })
  }

  return promise
    .run()
};

module.exports.getById = function (positionId) {
  return Position.get(positionId).run();
};

module.exports.create = function (positionData) {
  return Position.save(positionData)
};

module.exports.delete = function (positionId) {
  return Position
    .get(positionId)
    .then((position) => {
      return position.delete();
    })
};