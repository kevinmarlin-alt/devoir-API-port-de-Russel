const express = require('express');
const router = express.Router();

const reservationService = require('../services/reservation')
const private = require('../middlewares/authenticate')


router.get('/:id/reservations', private, reservationService.all)
router.get('/:id/reservations/:idReservation', private, reservationService.getById)
router.post('/:id/reservations', private, reservationService.add)
router.put('/:id/reservations/:idReservation', private, reservationService.update)
router.delete('/:id/reservations/:idReservation', private, reservationService.delete)

module.exports = router;