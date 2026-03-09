const Catway = require('../models/catway')
const reservationServices = require('../services/reservations.services')
const User = require('../models/user')

const usersServices = require('../services/users.services')
const catwaysServices = require('../services/catways.services')

exports.login = (req, res) => {
  res.status(200).render('index');
}


exports.dashboard = async (req, res) => {

    try {
        const user = await usersServices.getByEmail(req.user.email)
        const reservations = await reservationServices.findCurrent()


        if(!reservations) {
          return res.status(404).json({ message: "Il n'y a pas de réservation." })
        }
        res.status(200).render("dashboard", {
            user: user, 
            date: new Date().toLocaleDateString("en-FR"),
            reservations
        })
    } catch (error) {
        res.status(501).json({ message: "Erreur lors de la récupération des réservations" });
    }
}


exports.users = async (req, res) => {
    try {
        const users = await User.find().sort({ username: 1 })
        if (!users) {
            return res.status(404).send("Utilisateur introuvable");
        }
        res.status(200).render('users', {
            user: req.user, 
            userSelected: null,
            users
        })
    } catch (error) {
      res.status(501).json({ message: "Erreur lors de la récupération des utilisateurs" });
    }
}


exports.catways = async (req, res) => {
  try {
    const catways = await catwaysServices.findAll()

    if(!catways) {
      return res.status(404).json({ message: "Il n'y a pas de catway." });
    }
          
    res.status(200).render('catways', {
        user: req.user, 
        catways
    })

  } catch (error) {
    res.status(501).json({ message: "Erreur lors de la récupération des catways" });
  }
}

exports.reservations = async (req, res) => {

    try {
        const catways = await catwaysServices.findAll()

        if (!catways || catways.length === 0) {
          return res.status(404).json({ message: "Il n'y a pas de catways actuellement" })
        }


        res.status(200).render('reservations', {
            user: req.user,
            catways
          })
    } catch (error) {
      res.status(501).json({ message: "Erreur lors de la récupération des catways" });
    }

}


