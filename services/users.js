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
            //link: `/users/${users.email}`,
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
        user.password = bcrypt.hash
        const users = await User.find().sort({ username: 1 })
        if (!user || !users) {
            return res.status(404).send("Utilisateur introuvable");
        }

        res.status(200).json( {user} )
        //res.status(200).render('users', {
        //    user: req.session.user,
        //    userSelected: user,
        //    users
        //})

        

    } catch (error) {
        res.status(404).json({ message: error })
        //console.log(error.message)
    }
}

// callback ajouter un user
exports.createOne = async (req, res, next) => {
    delete req.body._id
    const user = new User({
        ...req.body
    })

    try {
        console.log(user)
        user.save()

        return res.status(200).json({ message: "Utilisateur enregistré !" })

    } catch (error) {
        return res.status(400).json({ error })
    }
}

