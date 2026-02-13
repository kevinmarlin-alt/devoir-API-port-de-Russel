const express = require('express')

const Reservation = require('../models/reservation')

module.exports = async (req, res, next) => {
    
    try {
        const reservations = await Reservation.find().sort({ startDate: 1 })

        res.render("dashboard", {
            user: req.session.user, 
            date: new Date().toLocaleDateString("en-GB"),
            reservations
        })

    } catch (error) {
        res.status(500).send("Erreur lors de la récupération des réservations");
    }
}