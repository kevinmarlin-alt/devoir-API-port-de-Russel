const mongoose = require('mongoose')
const { schema } = require('./user')
const Schema = mongoose.Schema

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
        required: true
    },
    endDate: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model("Reservation", Reservation)