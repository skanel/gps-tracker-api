let thinky = require('../lib/thinky');
let type = thinky.type;

const Position = thinky.createModel("Position", {
  id: type.string(),
  terminalId: type.string().required(),
  lat: type.string().required(),
  long: type.string().required(),
  createdAt: type.string()
});

module.exports = Position;