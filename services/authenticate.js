const User = require('../models/user')
const bcrypt = require('bcryptjs')

exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne(
            { email },
            '-__v -createdAt -updatedAt'
        );

        if (!user) {
            return res.status(401).json({ message: "Identifiants incorrects" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch)

        if (!isMatch) {
            return res
                .status(401)
                .json({ message: "Identifiants incorrects" });
        }

        // Création de la session avec express-session
        req.session.user = {
            id: user._id,
            email: user.email,
            username: user.username
          };

        res.status(200).json({ message: "Connexion réussie" })
        
     
    } catch (error) {
        return res
            .status(500)
            .json({ message: error.message });
            
    }
};

exports.logout = (req, res, next) => {
    return res.status(200).redirect('/')
}


