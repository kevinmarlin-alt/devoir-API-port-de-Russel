const authenticateServices = require('../services/authenticate.services')

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await authenticateServices.findUser(email)

        if (!user) {
            return res.status(401).json({ message: "Identifiants incorrects" });
        }

        const isMatch = await authenticateServices.compare(password, user.password)
        

        if (!isMatch) {
            return res.status(401).json({ message: "Identifiants incorrects" });
        }

        // Création de la session avec express-session
        req.session.user = {
            id: user._id,
            email: user.email,
            username: user.username
          };

        res.status(200).json({ message: "Connexion réussie" })
        
     
    } catch (error) {
        console.error("Erreur : ", error)
        res.status(500).json({ message: "Erreur serveur lors de l'authentification" });
    }
};

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Erreur lors de la déconnexion : ", err);
            return res.status(500).json({ message: "Erreur serveur lors de la déconnexion" });
        }
        res.status(200).redirect('/')
    })
}


