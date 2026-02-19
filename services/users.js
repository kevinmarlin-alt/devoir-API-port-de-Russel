const User = require('../models/user')
const bcrypt = require('bcryptjs')

exports.all = async (req, res, next) => {
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

    }
}

// callback afficher un user
exports.getByEmail = async (req, res, next) => {
    const email = req.params.email
    console.log("--- email -->",email)
    try {
        const user = await User.findOne({ email: email })
        
        if (!user) {
            return res.status(404).send("Utilisateur introuvable");
        }

        return res.status(200).json({ user })
 
    } catch (error) {
        return res.status(404).json({ message: error })
    }
}

// callback ajouter un user
exports.createOne = async (req, res, next) => {
    delete req.body._id
    
    try {
        const user = new User({
            ...req.body
        })
        console.log(user)
        user.save()

        return res.status(200).json({ message: "Utilisateur enregistré !" })

    } catch (error) {
        return res.status(400).json({ error })
    }
}

exports.upDateOne = async (req, res, next) => {
    const email = req.params.email
    const updates = {}
    if(req.body["username"] !== undefined ) {
        updates["username"] = req.body["username"]
    }
    
    if(req.body["password"] !== undefined) {
        updates["password"] = bcrypt.hashSync(req.body["password"])
    } 

    console.log("update",updates)
    try {

            const user = await User.findOneAndUpdate(
                {email: email}, {
                    $set: updates,
                    updatedAt: Date.now()
                }
            )

            if(!user) {
                return res.status(404).json('user_not_found')
            }

            return res.status(201).json({ user })



    } catch (error) {
        res.status(501).json({ message: error })
    }
}

exports.deleteOne = async (req, res, next) => {
    const email = req.params.email

    try {

        await User.deleteOne({ email: email })

        res.status(200).json({ message: "Suppression du compte réussit" })

    } catch (error) {
        return res.status(501).json({ message: error })
    }
}

