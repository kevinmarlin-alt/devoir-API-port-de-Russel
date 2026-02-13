const express = require('express')
const router = express.Router()

const authenticateMiddleware = require('../middlewares/authenticate')
const dashboardService = require('../services/dashboard')

router.get('/dashboard', authenticateMiddleware, dashboardService)

module.exports = router