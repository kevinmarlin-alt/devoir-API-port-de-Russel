const express = require('express');
const router = express.Router();

const usersServices = require('../services/users');
const user = require('../models/user');


/* GET users listing. */
router.get('/', usersServices.all)
router.get('/:email', usersServices.getByEmail)
router.put('/:email', usersServices.createOne)

module.exports = router;
