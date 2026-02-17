const express = require('express')
const router = express.Router()

const dashboardService = require('../services/dashboard')

router.get('/',  dashboardService)

module.exports = router