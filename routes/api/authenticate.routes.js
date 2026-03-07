const express = require('express')
const authenticateService = require('../../controllers/authenticate.controllers')

const router = express.Router()


/**
 * @swagger
 * /api/login:
 *  post:
 *     summary: Récupère les détails d'un utilisateur à partir de son email
 *     description: Récupère les détails d'un utilisateur à partir de son email fourni dans le paramètre de chemin
 *     tags: [Authenticate]
 *     security: []
 *     requestBody:
 *         content:
 *             application/json:
 *                 schema:
 *                      type: object
 *                      required:
 *                          - email
 *                          - password
 *                      properties:
 *                          email:
 *                            type: string
 *                            description: Email de l'utilisateur au format exemple@russell-port.fr
 *                          password:
 *                            type: string
 *                            description: Mot de passe de l'utilisateur
 *     responses:
 *      200:
 *        description: Connexion réussie
 *        headers:
 *          port-russell-session:
 *              schema:
 *                  type: string
 *      404:
 *        description: Utilisateur introuvable pour l'email fourni
 *      500:
 *        description: Erreur interne du serveur
 */
router.post('/login', authenticateService.login)

/**
 * @swagger
 * /api/logout:
 *  get:
 *      summary: Réinitialise des données d'authentification et déconnecte l'utilisateur
 *      tags: [Authenticate]
 *      responses:
 *       200:
 *          description: Redirection vers la page de connexion
 *          
 */
router.get('/logout', authenticateService.logout)



module.exports = router