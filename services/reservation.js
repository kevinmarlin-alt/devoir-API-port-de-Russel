const express = require('express')

const Reservation = require('../models/reservation')
const catway = require('../models/catway')

exports.all = async (req, res, next) => {
    const catwaySelected = req.params.id
    
    try {
        const reservations = await Reservation.find({ catwayNumber: catwaySelected })
        const catways = await catway.find()

        if(!reservations) {
            return res.status(404).json({ message: "Il n'y a pas de réservations actuellement pour ce catway !"})
        }
        return res.status(200).json( reservations )
        
        
    } catch (error) {
        console.error(error)
        return res.status(500).send("Erreur lors de la récupération des réservations");
    }
}

exports.getById = async (req, res, next) => {
     const idResa = req.params.idReservation

     try {
        const resa = await Reservation.findOne({ _id: idResa })
        console.log(resa)

        if(!resa) {
            return res.status(404).json({ message: "Reservation_not_found" })
        }

        return res.status(200).json( resa )

     } catch (error) {
        console.error(error)
        return res.status(500).send("Erreur lors de la récupération des informations");
     }
}

exports.add = async (req, res, next) => {
    
}
exports.update = async (req, res, next) => {

}
exports.delete = async (req, res, next) => {
    const idResa = req.params.idReservation

    try {
        await Reservation.deleteOne({ _id: idResa})

        res.status(200).json({ message: "Suppression de la réservation réussite" })

    } catch (error) {
        return res.status(501).json({ message: error })
    }
}