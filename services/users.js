const User = require('../models/user')

exports.all = async (req, res, next) => {
    try {
        const users = await User.find().sort({ username: 1 })

        res.status(200).render('users', {
            user: req.session.user, 
            link: `/users/${users.email}`,
            users
        })

    } catch (error) {

    }
}

// callback afficher un user
exports.getByEmail = async (req, res, next) => {
    console.log(req.body)
}

// callback ajouter un user
exports.createOne = async (req, res, next) => {
    
    const temp = ({
        username    : req.body.username,
        email       : req.body.email,
        password    : req.body.password
    })

    try {
        const userTemp = new User()
        userTemp.username = temp.username
        userTemp.email = temp.email
        userTemp.password = temp.password
        
        console.log(userTemp)
        userTemp.save()

        return res.status(200).next()

    } catch (error) {
        return res.status(501).json(error)
    }
}

