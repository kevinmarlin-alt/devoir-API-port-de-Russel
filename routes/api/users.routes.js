const express = require('express');
const usersControllers = require('../../controllers/users.controllers');
const privateAuth = require('../../middlewares/authenticate')

const router = express.Router();


/**
 * @swagger
 * /users/{email}:
 *  get:
 *     summary: Récupère les détails d'un utilisateur à partir de son email
 *     description: Récupère les détails d'un utilisateur à partir de son email fourni dans le paramètre de chemin
 *     tags: [Users]
 *     parameters:
 *      - in: path
 *        name: email
 *        required: true
 *        description: L'email de l'utilisateur à récupérer
 *        schema:
 *          type: string
 *     responses:
 *      200:
 *        description: Détails de l'utilisateur récupérés avec succès
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      404:
 *        description: Utilisateur introuvable pour l'email fourni
 *        content:
 *          application/json:
 *            schema:
 *              type: string
 *              example: "Utilisateur non trouvé"
 *      500:
 *        description: Erreur interne du serveur
 *        content:
 *          application/json:
 *            schema:
 *              type: string
 *              example: "Erreur interne du serveur"
 */
router.get('/:email', privateAuth, usersControllers.getByEmail)
router.post('/', privateAuth, usersControllers.createOne)
router.put('/:email', privateAuth, usersControllers.upDateOne)
router.delete('/:email', privateAuth, usersControllers.delete)


module.exports = router;