const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

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

exports.authenticate = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne(
            { email },
            '-__v -createdAt -updatedAt'
        );

        if (!user) {
            return res.status(404).json("user_not_found");
        }

        const isMatch = bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(403).json("wrong_credentials");
        }

        delete user._doc.password;

        const token = jwt.sign(
            { user },
            process.env.SECRET_KEY,
            { expiresIn: '24h' }
        );

        return res
            .header('Authorization', `Bearer ${token}`)
            .status(200)
            .json("authenticate_succeed");

    } catch (error) {
        return res.status(500).json(error.message);
    }
};