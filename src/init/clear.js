let r = require('../lib/thinky').r;
let config = require('../config');

r.db(config.db.db)
  .tableList()
  .forEach(table => r.db(config.db.db).table(table).delete())
  .run()
  .then(()=> r.getPoolMaster().drain())
  .then(()=>console.info("Cleared the db!"));