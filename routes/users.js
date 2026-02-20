const express = require('express');
const router = express.Router();

const usersServices = require('../services/users');

router.get('/:email', usersServices.getByEmail)
router.put('/:email', usersServices.createOne)
router.post('/', usersServices.upDateOne)
router.delete('/:email', usersServices.deleteOne)

module.exports = router;