let express = require('express');
let parser = require('body-parser');
let cors = require('cors');

let config = require('./src/config');
let routes = require('./src/routes');

let app = express();

app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));
app.use(cors({exposedHeaders: ['Location']}));
app.use('/api', routes);

app.listen(config.app.port, () => {
    console.log('API started on port ' + config.app.port);
});

app.route('/api')
  .get((req, res) => res.json({success: true, message: "gps-tracker api working"}));