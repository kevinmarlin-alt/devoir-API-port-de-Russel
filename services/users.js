const User = require('../models/user')
const bcrypt = require('bcryptjs')

exports.getByEmail = async (req, res) => {
    const email = req.params.email
    try {
        const user = await User.findOne({ email: email })
        
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        res.status(200).json( user )
 
    } catch (error) {
        console.error("Erreur : ", error)
        res.status(500).json({ message: "Erreur serveur lors de la recherche de l'utilisateur" })
    }
}

exports.createOne = async (req, res) => {
    delete req.body._id
    
    try {
        const user = new User({
            ...req.body
        })
        await user.save()

        res.status(200).json({ message: "Utilisateur enregistré !" })

    } catch (error) {
        console.error("Erreur : ", error)
        res.status(500).json({ message: "Erreur serveur lors de l'enregistrement" })
    }
}

exports.upDateOne = async (req, res) => {
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
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        res.status(201).json( user )



    } catch (error) {
        console.error("Erreur : ", error)
        res.status(501).json({ message: "Erreur serveur lors de l'enregistrement" })
    }
}

exports.delete = async (req, res) => {
    const email = req.params.email

    try {

        await User.deleteOne({ email: email })

        res.status(200).json({ message: "Suppression du compte réussit" })

    } catch (error) {
        console.error("Erreur : ", error)
        res.status(501).json({ message: "Erreur serveur lors de la suppression de l'utilisateur" })
    }
}

