let r = require('../lib/thinky').r;

let Position = require('../models/Position');
let positions = require('./data/positions.json');

function addPosition(position) {
  return Position.save(position, {conflict: 'update'})
}

function addAllPositions() {
  let promises = positions.map((position) => addPosition(position));
  return Promise.all(promises)
    .then((results) => console.log("Imported "+results.length+" positions!"))
    .then(() => r.getPoolMaster().drain())
    .catch(err => console.log(err.toString()))
}

addAllPositions();