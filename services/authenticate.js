const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    console.log("test")
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

        delete user._doc.password;

        // /!\ section TOKEN a supprimer
        const token = jwt.sign(
            { user },
            process.env.SECRET_KEY,
            { expiresIn: '24h' }
        );

        // Création de la session avec express-session
        req.session.user = {
            id: user._id,
            email: user.email,
            username: user.username
          };
        console.log(req.session.user)
        res.redirect("/dashboard")
        
        // /!\ section TOKEN a supprimer
        return res
            .header('Authorization', `Bearer ${token}`)
            .status(200)
            .json("authenticate_succeed");

    } catch (error) {
        return res
            .status(500)
            .render("index", { error: error.message });
            
    }
};

exports.logout = (req, res, next) => {
    res.redirect('/')
}