var express = require('express');
var router = express.Router();

const services = require('../services/users')

/* GET users listing. */
router.put('/add', services.add);

//route.put('/add', services.add)
router.post('/authenticate', services.authenticate)

module.exports = router;
