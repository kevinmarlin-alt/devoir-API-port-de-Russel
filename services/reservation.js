const express = require('express')

const Reservation = require('../models/reservation')

exports.findById = async (req, res, next) => {
    
    try {
        const catwaySelected = req.params.id
        const reservations = await Reservation.find({ catwayNumber: catwaySelected })
        
        return res.status(200).render('reservations', {
            reservations, 
            catwaySelected
        })
        
    } catch (error) {
        res.status(500).send("Erreur lors de la récupération des réservations");
    }
}