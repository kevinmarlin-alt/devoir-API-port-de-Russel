const express = require('express');
const router = express.Router();

const authentitaceRoute = require('./api/authenticate.routes')
const catwayRoute = require('./api/catways.routes')
const usersRoute = require('./api/users.routes')
const reservationRoute = require('./api/reservation.routes')

const privateAuth = require('../middlewares/authenticate');

router.use('/', authentitaceRoute)
router.use('/catways', privateAuth, catwayRoute)
router.use('/catways', privateAuth, reservationRoute)
router.use('/users', privateAuth, usersRoute)

module.exports = router;