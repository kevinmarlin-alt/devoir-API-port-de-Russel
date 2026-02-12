var express = require('express');
var router = express.Router();

const services = require('../services/users')
//const private = require('../middlewares/private')

/* GET users listing. */
router.get('/:email', services.getByEmail)
router.put('/add', services.add);

//route.put('/add', services.add)
//router.post('/authenticate', services.authenticate)

module.exports = router;
