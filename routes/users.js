const express = require('express');
const router = express.Router();

const usersServices = require('../services/users')
//const private = require('../middlewares/private')

/* GET users listing. */
router.get('/', usersServices.all)

module.exports = router;
