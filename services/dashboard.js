const express = require('express')

const Reservation = require('../models/reservation')

module.exports = async (req, res, next) => {
    
    try {
        const reservations = await Reservation.find().sort({ startDate: 1 })
        console.log(req.session.user)
        res.status(200).render("dashboard", {
            user: req.session.user, 
            date: new Date().toLocaleDateString("en-FR"),
            reservations
        })

    } catch (error) {
        res.status(500).send("Erreur lors de la récupération des réservations");
    }
}