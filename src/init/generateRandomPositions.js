"use strict"
let uuid = require('uuid');
let jsonfile = require('jsonfile');
let moment = require('moment');

function getRandomInRange(from, to, fixed) {
  return (Math.random() * (to - from) + from).toFixed(fixed);
}

function generateRandomPositions() {
  let terminalIds = ["id-1", "id-2", "id-3"];
  let positions = [];
  for (let i=0; i<100; i++){
    let now = moment().add(Math.floor(Math.random()*60),'m').format();
    let id = uuid.v4();
    let position = {
      id: id,
      terminalId: terminalIds[Math.floor(Math.random()*3)],
      lat: getRandomInRange(180, -180, 3),
      long: getRandomInRange(180, -180, 3),
      createdAt: now,
      updatedAt: now
    };
    positions.push(position);
  }
  let file = './data/positions.json';
  return jsonfile.writeFile(file, positions, {spaces: 2}, (err) => {if (err) console.log(err)})
}

generateRandomPositions();

