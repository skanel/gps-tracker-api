let router = require('express').Router();
let authCtrl = require('../controllers/authCtrl');

router.route('/')
  .post(authCtrl.auth);

module.exports = router;