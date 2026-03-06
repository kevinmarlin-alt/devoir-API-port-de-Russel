const express = require('express');
const reservationService = require('../services/reservation')
const privateAuth = require('../middlewares/authenticate')

const router = express.Router();

router.get('/:id/reservations', privateAuth, reservationService.all)
router.get('/:id/reservations/:idReservation', privateAuth, reservationService.getById)
router.post('/:id/reservations', privateAuth, reservationService.add)
router.put('/:id/reservations/:idReservation', privateAuth, reservationService.update)
router.delete('/:id/reservations/:idReservation', privateAuth, reservationService.delete)

module.exports = router;