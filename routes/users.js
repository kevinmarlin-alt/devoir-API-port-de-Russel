var express = require('express');
var router = express.Router();

//const services = require('../services/users')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//route.put('/add', services.add)

module.exports = router;
