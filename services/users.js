const User = require('../models/user')

// callback afficher un user
exports.getByEmail = async (req, res, next) => {
    const email = req.params.email
    console.log(email)
    try {
        let user = await User.find({ email: email })
        if(user) {
            return res.status(200).json(user)
        }

        return res.status(404).json("user_not_found")
    } catch (error) {
        return res.status(501).json(error)
    }
}

// callback ajouter un user
exports.add = async (req, res, next) => {
    const temp = ({
        username    : req.body.username,
        email       : req.body.email,
        password    : req.body.password
    })

    try {
        let user = await User.create(temp)

        return res.status(201).json(user)
    } catch (error) {
        console.log(error)
        return res.status(501).json(error)
    }
}

