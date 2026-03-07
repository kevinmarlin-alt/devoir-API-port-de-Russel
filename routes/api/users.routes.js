const express = require('express');
const usersControllers = require('../../controllers/users.controllers');
const privateAuth = require('../../middlewares/authenticate')

const router = express.Router();


/**
 * @swagger
 * /api/users/{email}:
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
 *      500:
 *        description: Erreur interne du serveur
 */
router.get('/:email', privateAuth, usersControllers.getByEmail)

/**
 * @swagger
 * /api/users:
 *  post:
 *      summary: Créer un nouvel utilisateur
 *      description: Processus de création d'un nouvel utilisateur en fonction des données au format json transmise dans le body de la requête
 *      tags: [Users]
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          200:
 *              description: Utilisateur enregistré
 *          500: 
 *              description: Erreur serveur lors de création de l'utilisateur
 */
router.post('/', privateAuth, usersControllers.createOne)

/**
 * @swagger
 * /api/users/{email}:
 *  put:
 *      summary: Mets à jour les détails d'un utilisateur à partir de son email
 *      description: Mets à jour les détails d'un utilisateur à partir de son email fourni dans le paramètre de chemin
 *      tags: [Users]
 *      parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: L'email de l'utilisateur à récupérer
 *         schema:
 *           type: string
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          200:
 *              description: Utilisateur modifié
 *              content:
 *                application/json:
 *                  schema:
 *                    $ref: '#/components/schemas/User'
 *          404:
 *              description: Utilisateur non trouvé
 *          501: 
 *              description: Erreur serveur lors de l'enregistrement
 */
router.put('/:email', privateAuth, usersControllers.upDateOne)

/**
 * @swagger
 * /api/users/{email}:
 *  delete:
 *      summary: Supprime un utilisateur à partir de son email
 *      description: Supprime un utilisateur à partir de son email fourni dans le paramètre de chemin
 *      tags: [Users]
 *      parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: L'email de l'utilisateur à récupérer
 *         schema:
 *           type: string
 *      responses:
 *          200:
 *              description: Suppression de l'utilisateur réussit
 *          501: 
 *              description: Erreur serveur lors de la suppression de l'utilisateur
 */
router.delete('/:email', privateAuth, usersControllers.delete)


module.exports = router;