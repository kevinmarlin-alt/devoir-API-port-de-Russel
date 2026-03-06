const Reservation = require('../models/reservation')

exports.findAll = async (catwayNumber) => {
    return Reservation.find({ catwayNumber })
}

exports.getById = async (_id) => {
    return Reservation.findOne({ _id })
}

exports.add = async (resa) => {
    return resa.save()
}

exports.findOneAndUpdate = async (_id, playload) => {
    return Reservation.findOneAndUpdate({ _id }, playload)
}

exports.delete = async (_id) => {
    return Reservation.deleteOne({ _id })
}

exports.findCurrent = async () => {
    return Reservation.find({ 
              endDate: {$gte: new Date().toISOString()}, 
              startDate: {$lte: new Date().toISOString()} 
            }).sort({ startDate: 1 })
}