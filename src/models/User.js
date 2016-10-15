let thinky = require('../lib/thinky');
let type = thinky.type;

const User = thinky.createModel("User", {
  id: type.string(),
  username: type.string().required(),
  password: type.string().required(),
  salt: type.string().required(),
  createdAt: type.date(),
  updatedAt: type.date()
});

module.exports = User;