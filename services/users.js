const User = require('../models/user')

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