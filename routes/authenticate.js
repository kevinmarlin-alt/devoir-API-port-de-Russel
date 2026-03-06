const express = require('express')
const authenticateService = require('../services/authenticate')

const router = express.Router()


/**
 * @swagger
 */
router.post('/login', authenticateService.login)

/**
 * @swagger
 */
router.get('/logout', authenticateService.logout)



module.exports = router