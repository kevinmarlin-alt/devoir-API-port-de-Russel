const User = require('../models/user')
const bcrypt = require('bcryptjs')


// callback afficher un user
exports.getByEmail = async (req, res, next) => {
    const email = req.params.email
    try {
        const user = await User.findOne({ email: email })
        
        if (!user) {
            return res.status(404).json({ success: false, message: "Utilisateur non trouvé" });
        }

        res.status(200).json({ success: true, data: user })
 
    } catch (error) {
        console.error("Erreur : ", error)
        res.status(500).json({ success: false, message: "Erreur serveur lors de la recherche de l'utilisateur" })
    }
}

// callback ajouter un user
exports.createOne = async (req, res, next) => {
    delete req.body._id
    
    try {
        const user = new User({
            ...req.body
        })
        await user.save()

        res.status(200).json({ success: true, message: "Utilisateur enregistré !" })

    } catch (error) {
        console.error("Erreur : ", error)
        res.status(500).json({ success: false, message: "Erreur serveur lors de l'enregistrement" })
    }
}

exports.upDateOne = async (req, res, next) => {
    const email = req.body.email
    const updates = {}
    if(req.body["username"] !== undefined ) {
        updates["username"] = req.body["username"]
    }
    
    if(req.body["password"] !== undefined) {
        updates["password"] = bcrypt.hashSync(req.body["password"])
    } 

    try {

        const user = await User.findOneAndUpdate(
            {email: email}, {
                $set: updates,
                updatedAt: Date.now()
            }
        )
        if(!user) {
            return res.status(404).json({ success: false, message: "Utilisateur non trouvé" });
        }
        res.status(201).json({ success: true, data: user })



    } catch (error) {
        console.error("Erreur : ", error)
        res.status(501).json({ success: false, message: "Erreur serveur lors de l'enregistrement" })
    }
}

exports.deleteOne = async (req, res, next) => {
    const email = req.params.email

    try {

        await User.deleteOne({ email: email })

        res.status(200).json({ success: true, message: "Suppression du compte réussit" })

    } catch (error) {
        console.error("Erreur : ", error)
        res.status(501).json({ success: false, message: "Erreur serveur lors de la suppression de l'utilisateur" })
    }
}

