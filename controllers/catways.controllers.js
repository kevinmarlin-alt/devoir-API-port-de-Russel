const catwaysServices = require('../services/catways.services')

exports.all = async (req, res) => {
    try {
        const catways = await catwaysServices.findAll()

        if(!catways) {
            return res.status(404).json({ message: "Liste de catways introuvable" })
        }

        res.status(200).json(catways)

    } catch (error) {
        console.error("Erreur : ", error)
        return res.status(501).json({ message: "Erreur serveur lors de la recherche de la liste des catways" })
    }
}

exports.getById = async (req, res) => {
    const catwayNumber = req.params.id
    try {
        const catway = await catwaysServices.findOne(catwayNumber)

        if(!catway) {
            return res.status(404).json({ message: `Catway n°${catwayNumber} introuvable` })
        }

        res.status(200).json( catway )

    } catch (error) {
        console.error("Erreur : ", error.message)
        res.status(501).json({ message: "Erreur serveur lors de la recherche du catway" })
    }

}

const Catway = require('../models/catway')
exports.add = async (req, res) => {
    delete req.body._id
    
    try {
        const catway = new Catway({
            ...req.body
        })

        await catwaysServices.save(catway)

        return res.status(200).json({ message: "Catway enregistré !" })

    } catch (error) {
        console.error("Erreur : ", error)
        res.status(500).json({ message: "Erreur serveur lors de l'enregistrement du catway" })
    }
}

exports.updateOne = async (req, res) => {
    const catwayNumber = req.params.id

    try {
        const catway = await catwaysServices.findOneAndUpdate(catwayNumber , 
            { 
                catwayType: req.body.catwayType,
                catwayState: req.body.catwayState
             }
        )

        if(!catway) {
            return res.status(404).json({ message: `Catway n°${catwayNumber} introuvabe` })
        }

        res.status(201).json( catway )

    } catch (error) {
        console.error("Erreur : ", error)
        res.status(501).json({ message: "Erreur serveur lors de la mise à jour du catway" })
    }

}

exports.delete = async (req, res) => {
    const catwayNumber = req.params.id 

    try {
        await catwaysServices.deleteOne(catwayNumber)

        res.status(202).json({ message: 'Catway supprimé !' })
        
    } catch (error) {
        console.error("Erreur : ", error)
        res.status(501).json({ message: 'Erreur serveur lors de la suppression du catway' })
    }
}