const Catway = require('../models/catway')


exports.All = async (req, res, next) => {

    try {

        const catways = await Catway.find().sort({ catwayNumber: 1 })
        console.log(catways.length)
        res.render('catways', {
            user: req.session.user, 
            catways
        })

    } catch (error) {

    }

}