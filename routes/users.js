const express = require('express');
const router = express.Router();

const usersServices = require('../services/users');



/* GET users listing. */
router.get('/', usersServices.all)
router.get('/:email', usersServices.getByEmail)
router.put('/:email', usersServices.createOne)
router.post('/:email', usersServices.upDateOne)
router.delete('/:email', usersServices.deleteOne)

module.exports = router;
