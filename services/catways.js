const Catway = require('../models/catway')


exports.all = async (req, res, next) => {

    try {
        const catways = await Catway.find().sort({ catwayNumber: 1 })

        res.render('catways', {
            user: req.session.user, 
            catways
        })

    } catch (error) {

    }

}