var express = require('express');
var router = express.Router();

//const userRoute = require('./users')
const authentitaceRoute = require('./authenticate')
const dashboardRoute = require('./dashboard')
//const private = require('../middlewares/private')
 

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    error: null 
  });
});

router.use('/', authentitaceRoute)
router.use('/', dashboardRoute)
//router.use('/users', private.checkJWT, userRoute)

module.exports = router;
