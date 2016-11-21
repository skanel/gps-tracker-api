let moment = require('moment');
let r = require('../lib/thinky').r;

let User = require('../models/User');
let password = require('../utils/password');
let users = require('./data/users.json');

function addUser(user) {
  let now = moment().format();
  let hashedPassword = password.hashPassword(user.password);
  Object.assign(user, {createdAt: now, updatedAt: now, password: hashedPassword.pass, salt: hashedPassword.salt});
  return User.save(user, {conflict: 'update'})
}

function addAllUsers() {
  let promises = users.map((user) => addUser(user));
  return Promise.all(promises)
    .then((results) => console.log("Imported "+results.length+" users!"))
    .then(() => r.getPoolMaster().drain())
    .catch(err => console.log(err.toString()))
}

addAllUsers();