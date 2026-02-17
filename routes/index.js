var express = require('express');
var router = express.Router();

//const userRoute = require('./users')
const authentitaceRoute = require('./authenticate')
const dashboardRoute = require('./dashboard')
const catwayRoute = require('./catways')
const usersRoute = require('./users')
const reservationRoute = require('./reservation')

//const private = require('../middlewares/private')

const authenticateMiddleware = require('../middlewares/authenticate')
 

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    error: null 
  });
});

router.use('/', authentitaceRoute)

router.use('/dashboard', dashboardRoute)
router.use('/catways', catwayRoute, reservationRoute)
router.use('/users', usersRoute)


module.exports = router;
