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

exports.getById = async (req, res, next) => {
    const catwayNumber = req.params.id
    try {
        const catway = await Catway.findOne({ catwayNumber: catwayNumber })

        if(!catway) {
            return res.status(404).json({ message: `Catway n°${catwayNumber} introuvabe` })
        }

        return res.status(200).json( catway )

    } catch (error) {
        return res.status(501).json({ message: error })
    }

}

exports.add = async (req, res, next) => {
    delete req.body._id
    
    try {
        const catway = new Catway({
            ...req.body
        })
        console.log(catway)
        catway.save()

        return res.status(200).json({ message: "Catway enregistré !" })

    } catch (error) {
        return res.status(404).json({ error })
    }
}

exports.updateOne = async (req, res, next) => {
    const catwayNumber = req.params.id
    try {
    
        const catway = await Catway.findOneAndUpdate(
            { catwayNumber: catwayNumber }, 
            { 
                catwayType: req.body.catwayType,
                catwayState: req.body.catwayState
             }
        )

        if(!catway) {
            return res.status(404).json('catway_not_found')
        }
        return res.status(201).json({ catway })



    } catch (error) {
        res.status(501).json({ message: error })
    }

}

exports.delete = async (req, res, next) => {
    const catwayNumber = req.params.id 

    try {
        await Catway.deleteOne({ catwayNumber: catwayNumber })
        res.status(202).json('Catway supprimé !')
        
    } catch (error) {
        res.status(501).json({ message: error })

    }
}