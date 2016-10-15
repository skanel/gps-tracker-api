let router = require('express').Router();

let authRoutes = require('./authRoutes');
let userRoutes = require('./userRoutes');
// let positionRoutes = require('./positionRoutes');

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
// router.use('/positions', usersRoutes);

module.exports = router;