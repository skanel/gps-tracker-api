var router = require('express').Router();
var userCtrl = require('../controllers/userCtrl');
var authorize = require('../middleware/authorize');

router.route('/')
  .get(authorize, userCtrl.getAll)
  .post(userCtrl.create);

router.route('/:userId')
  .get(authorize, userCtrl.getById)
  .put(authorize, userCtrl.update)
  .delete(authorize, userCtrl.delete);

module.exports = router;