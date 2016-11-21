var router = require('express').Router();
var positionCtrl = require('../controllers/positionCtrl');
var authorize = require('../middleware/authorize');

router.route('/')
  .get(authorize, positionCtrl.getAll)
  .post(positionCtrl.create);

router.route('/:positionId')
  .get(authorize, positionCtrl.getById)
  .delete(authorize, positionCtrl.delete);

module.exports = router;