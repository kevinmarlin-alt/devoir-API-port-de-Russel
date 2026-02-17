const express = require('express');
const router = express.Router();

const reservationService = require('../services/reservation')

router.get('/:id/reservations', reservationService.findById)
//router.get('/:id', catwayService)
//router.post('/', catwayService)
//router.put('/:id', catwayService)
//router.delete('/:id', catwayService)

module.exports = router;