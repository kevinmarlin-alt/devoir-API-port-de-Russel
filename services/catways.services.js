const Catway = require('../models/catway')

exports.findAll = async () => {
    return Catway.find().sort({ catwayNumber: 1 })
}

exports.findOne = async (catwayNumber) => {
    return Catway.findOne({ catwayNumber })
}

exports.save = async (catway) => {
    return catway.save()
}

exports.findOneAndUpdate = async (catwayNumber, playload) => {
    return Catway.findOneAndUpdate({catwayNumber}, playload)
}

exports.deleteOne = async (catwayNumber) => {
    return Catway.deleteOne({ catwayNumber })
}