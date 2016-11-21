let config = require('../config');
let thinky = require('thinky')(config.db);

module.exports = thinky;