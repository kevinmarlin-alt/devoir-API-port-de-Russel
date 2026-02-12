const express = require('express')
const router = express.Router()
const authenticateService = require('../services/authenticate')

router.post('/login', authenticateService.login)
router.get('/logout', authenticateService.logout)

module.exports = router