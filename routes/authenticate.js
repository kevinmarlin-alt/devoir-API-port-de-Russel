const express = require('express')
const router = express.Router()
const authenticateService = require('../services/authenticate')
//const private = require('../middlewares/private')

router.post('/login', authenticateService.login)
router.get('/logout', authenticateService.logout)



module.exports = router