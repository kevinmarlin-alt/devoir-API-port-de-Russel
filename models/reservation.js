const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
 * @swagger
 * components:
 *   schemas:
 *     Reservation:
 *       type: object
 *       required:
 *         - catwayNumber
 *         - clientName
 *         - boatName
 *         - startDate
 *         - endDate
 *       properties:
 *         catwayNumber:
 *           type: number
 *           description: Numéro du catway réservé
 *         clientName:
 *           type: string
 *           description: Nom du client qui a effectué la réservation
 *         boatName:
 *           type: string
 *           description: Nom du bateau réservé
 *         startDate:
 *           type: string
 *           format: date-time
 *           description: Date de début de la réservation
 *         endDate:
 *           type: string
 *           format: date-time
 *           description: Date de fin de la réservation
 */
const Reservation = new Schema({
    catwayNumber: {
        type: Number,
        trim: true,
        required: true
    },
    clientName: {
        type: String,
        trim: true,
        required: true
    },
    boatName: {
        type: String,
        trim: true,
        required: true
    },
    startDate: {
        type: Date,
        trim: true,
        required: true
    },
    endDate: {
        type: Date,
        trim: true,
        required: true
    }
})

module.exports = mongoose.model("Reservation", Reservation)