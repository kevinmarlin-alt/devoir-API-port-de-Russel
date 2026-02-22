const express = require('express');
const router = express.Router();

const Reservation = require('../models/reservation')
const User = require('../models/user')
const Catway = require('../models/catway')

const authentitaceRoute = require('./authenticate')
const catwayRoute = require('./catways')
const usersRoute = require('./users')
const reservationRoute = require('./reservation')

const private = require('../middlewares/authenticate')

const session = require('express-session')

 

/* GET home page */
router.get('/', (req, res) => {
  res.status(200).render('index');
});

/* GET Dashboard page */
router.get('/dashboard', private,  async (req, res) => {
  try {
      const reservations = await Reservation.find().sort({ startDate: 1 })

      if(!reservations) {
        return res.status(404).json({ message: "Il n'y a pas de réservation." })
      }
      res.status(200).render("dashboard", {
          user: req.session.user, 
          date: new Date().toLocaleDateString("en-FR"),
          reservations
      })
  } catch (error) {
      res.status(501).json({ message: "Erreur lors de la récupération des réservations" });
  }
})

/* GET Users page */
router.get('/users', private, async (req, res) => {
  try {
      const users = await User.find().sort({ username: 1 })
      if (!users) {
          return res.status(404).send("Utilisateur introuvable");
      }
      res.status(200).render('users', {
          user: req.session.user, 
          userSelected: null,
          users
      })
  } catch (error) {
    res.status(501).json({ message: "Erreur lors de la récupération des utilisateurs" });
  }
})

/* GET Catways page */
router.get('/catways', private, async (req, res) => {
  try {
    const catways = await Catway.find().sort({ catwayNumber: 1 })
    console.log(catways)
      if(!catways) {
        return res.status(404).json({ message: "Il n'y a pas de catway." });
      }

      res.json( catways )
      res.status(200).render('catways', {
          user: req.session.user, 
          catways
      })

  } catch (error) {
    res.status(501).json({ message: "Erreur lors de la récupération des catways" });
  }
})

/* GET reservations page */
router.get('/reservations', private, (req, res) => {
  res.render('reservations', {
      user: req.session.user
    })
})



/* Middleware */
router.use('/', authentitaceRoute)
router.use('/catways', private, catwayRoute)
router.use('/catways', private, reservationRoute)
router.use('/users', private, usersRoute)

module.exports = router;
