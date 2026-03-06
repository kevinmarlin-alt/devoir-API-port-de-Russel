const express = require('express');
const reservationControllers = require('../../controllers/reservation.contollers')
const privateAuth = require('../../middlewares/authenticate')

const router = express.Router();

router.get('/:id/reservations', privateAuth, reservationControllers.all)
router.get('/:id/reservations/:idReservation', privateAuth, reservationControllers.getById)
router.post('/:id/reservations', privateAuth, reservationControllers.add)
router.put('/:id/reservations/:idReservation', privateAuth, reservationControllers.update)
router.delete('/:id/reservations/:idReservation', privateAuth, reservationControllers.delete)

module.exports = router;