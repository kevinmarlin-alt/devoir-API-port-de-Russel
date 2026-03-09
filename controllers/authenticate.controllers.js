const authenticateServices = require('../services/authenticate.services')
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await authenticateServices.findUser(email)
        
        const playload = {
            email: email,
            password: password
        }

        const token = jwt.sign(playload, process.env.JWT_SECRET, {
            expiresIn: 1000 * 60 * 60 //1h
        })
        
        if (!user) {
            return res.status(401).json({ message: "Identifiants incorrects" });
        }
        
        const isMatch = await authenticateServices.compare(password, user.password)
        

        if (!isMatch) {
            return res.status(401).json({ message: "Identifiants incorrects" });
        }

        res.cookie('port_russell_token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax'
        })

        res.status(200).json({ 
            message: "Connexion réussie",
            user: {
                email: email,
                password: password
            } 
        })
        
     
    } catch (error) {
        console.error("Erreur : ", error)
        res.status(500).json({ message: "Erreur serveur lors de l'authentification" });
    }
};

exports.logout = (req, res) => {
    res.status(200).redirect('/')
}


