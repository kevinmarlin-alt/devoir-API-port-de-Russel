const express = require('express')
const Reservation = require('../models/reservation')

exports.all = async (req, res) => {
    const catwaySelected = req.params.id
    
    try {
        const reservations = await Reservation.find({ catwayNumber: catwaySelected })

        if(!reservations) {
            return res.status(404).json({ success: false, message: "Il n'y a pas de réservations actuellement pour ce catway !"})
        }

        res.status(200).json( reservations )
        
    } catch (error) {
        console.error("Erreur : ", error)
        return res.status(500).json({ success: false, message: "Erreur serveur lors de la récupération des réservations" });
    }
}

exports.getById = async (req, res) => {
     const idResa = req.params.idReservation

     try {
        const resa = await Reservation.findOne({ _id: idResa })
        
        if(!resa) {
            return res.status(404).json({ success: false, message: "Réservation non trouvée" })
        }

        return res.status(200).json( resa )

     } catch (error) {
        console.error("Erreur : ", error)
        return res.status(501).json({ success: false, message: "Erreur serveur lors de la récupération des informations" });
     }
}

exports.add = async (req, res) => {
    const id = req.params.id

    try {
        const resa = new Reservation({
            ...req.body,
            catwayNumber: id
        })

        await resa.save()
        
        res.status(200).json({ success: true, message: "Réservation enregistrée !" })

    } catch (error) {
        console.error("Erreur : ", error)
        res.status(501).json({ success: false, message: "Erreur serveur lors de l'ajout de la réservation" });
    }
    
}

exports.update = async (req, res) => {
    const idResa = req.params.idReservation
   
    try {

        const resa = await Reservation.findOneAndUpdate(
            { _id: idResa }, 
            { 
                ...req.body
             }
        )   
        if(!resa) {
            return res.status(404).json({ success: false, message: "Réservation non trouvée" })
        }

        res.status(201).json({ success: true, message: "Modification de la réservation réussite !" }) 

    } catch (error) {
        console.error("Erreur : ", error)
        res.status(501).json({ success: false, message: "Erreur serveur lors de la mise à jour de la réservation" });
    }

}

exports.delete = async (req, res) => {
    const idResa = req.params.idReservation

    try {
        await Reservation.deleteOne({ _id: idResa})

        res.status(200).json({ success: true, message: "Suppression de la réservation réussite" })

    } catch (error) {
        console.error("Erreur : ", error)
        res.status(501).json({ success: false, message: "Erreur serveur lors de la suppression de la réservation" });
    }
}