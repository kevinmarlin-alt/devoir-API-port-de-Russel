const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne(
            { email },
            '-__v -createdAt -updatedAt'
        );

        if (!user) {
            return res
                .status(404)
                .render("index", {error: "Email ou mot de passe incorrect"});
        }

        const isMatch = bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res
                .status(403)
                .render("index", {error: "Email ou mot de passe incorrect"});
        }

        // Création de la session avec express-session
        req.session.user = {
            id: user._id,
            email: user.email,
            username: user.username
          };

        return res.status(200).redirect('/dashboard')
     
    } catch (error) {
        return res
            .status(500)
            .render("index", { error: error.message });
            
    }
};

exports.logout = (req, res, next) => {
    return res.status(200).redirect('/')
}