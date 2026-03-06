const express = require('express');
const router = express.Router();

const indexControllers = require('../controllers/index.controllers')
const privateAuth = require('../middlewares/authenticate');


router.get('/', indexControllers.login);
router.get('/dashboard', privateAuth, indexControllers.dashboard) 
router.get('/users', privateAuth, indexControllers.users)
router.get('/catways', privateAuth, indexControllers.catways)
router.get('/reservations', privateAuth, indexControllers.reservations)


module.exports = router;
