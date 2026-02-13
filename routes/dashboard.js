const express = require('express')
const router = express.Router()

const authenticateMiddleware = require('../middlewares/authenticate')
const dashboardService = require('../services/dashboard')
const catwayRoute = require('./catways')

router.get('/dashboard', authenticateMiddleware, dashboardService)
router.use('/catways', catwayRoute)

module.exports = router