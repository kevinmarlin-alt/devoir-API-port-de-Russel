const express = require('express');
const router = express.Router();
const Reservation = require('../models/reservation')
const User = require('../models/user')
const Catway = require('../models/catway')
const authentitaceRoute = require('./authenticate')
const catwayRoute = require('./catways')
const usersRoute = require('./users')
const reservationRoute = require('./reservation')
const privateAuth = require('../middlewares/authenticate');


router.get('/', (req, res) => {
  res.status(200).render('index');
});


router.get('/dashboard', privateAuth,  async (req, res) => {
  try {
      const reservations = await Reservation.find({ 
        endDate: {$gte: new Date().toISOString()}, 
        startDate: {$lte: new Date().toISOString()} 
      }).sort({ startDate: 1 })
          

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


router.get('/users', privateAuth, async (req, res) => {
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


router.get('/catways', privateAuth, async (req, res) => {
  try {
    const catways = await Catway.find().sort({ catwayNumber: 1 })
 
      if(!catways) {
        return res.status(404).json({ message: "Il n'y a pas de catway." });
      }

      
      res.status(200).render('catways', {
          user: req.session.user, 
          catways
      })

  } catch (error) {
    res.status(501).json({ message: "Erreur lors de la récupération des catways" });
  }
})


router.get('/reservations', privateAuth, (req, res) => {
  res.render('reservations', {
      user: req.session.user
    })
})

router.use('/', authentitaceRoute)
router.use('/catways', privateAuth, catwayRoute)
router.use('/catways', privateAuth, reservationRoute)
router.use('/users', privateAuth, usersRoute)



module.exports = router;
