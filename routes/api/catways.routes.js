const express = require('express');
const catwayControllers = require('../../controllers/catways.controllers')
const privateAuth = require('../../middlewares/authenticate')

const router = express.Router();

/**
 * @swagger
 * /api/catways/all:
 *  get:
 *      summary: Récupère la liste des Catways
 *      description: Récupère la liste globale des Catways dans l'odre croissant
 *      tags: [Catways]
 *      responses:
 *          200:
 *              description: Liste croissante des Catways enregistré
 *              content:
 *                  application/json:
 *                    schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/Reservation'
 *          501: 
 *              description: Erreur serveur lors de la recherche de la liste des catways
 *      
 */
router.get('/all', privateAuth, catwayControllers.all)

/**
 * @swagger
 * /api/catways/{id}:
 *  get:
 *      summary: Récupère les détails d'un Catway à partir de son numéro
 *      description: Récupère les détails d'un Catway à partir de son numéro fourni dans le paramètre de chemin
 *      tags: [Catways]
 *      parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numéro du Catway à récupérer
 *         schema:
 *           type: number
 *      responses:
 *          200:
 *              description: Liste croissante des Catways enregistré
 *              content:
 *                  application/json:
 *                    schema:
 *                      $ref: '#/components/schemas/Catway'
 *          501: 
 *              description: Erreur serveur lors de la recherche de la liste des catways
 * 
 */
router.get('/:id', privateAuth, catwayControllers.getById)

/**
 * @swagger
 * /api/catways:
 *  post:
 *      summary: Création d'un nouveau Catway
 *      description: Création d'un Catway selon les informations passer dans le corps de réponse
 *      tags: [Catways]
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Catway'
 *      responses:
 *          200:
 *              description: Catway enregistré
 *          500: 
 *              description: Erreur serveur lors de la création du catway
 * 
 */
router.post('/', privateAuth, catwayControllers.add)

/**
 * @swagger
 * /api/catways/{id}:
 *  put:
 *      summary: Mets à jour les détails d'un Catway à partir de son numéro
 *      description: Mets à jour les détails d'un Catway à partir de son numéro fourni dans le paramètre de chemin
 *      tags: [Catways]
 *      parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numéro du Catway à récupérer
 *         schema:
 *           type: number
 *      responses:
 *          200:
 *              description: Le Catway à été mis à jour
 *              content:
 *                  application/json:
 *                    schema:
 *                      $ref: '#/components/schemas/Catway'
 *          500: 
 *              description: Erreur serveur lors de la mise à jour du catway
 * 
 */
router.put('/:id', privateAuth, catwayControllers.updateOne)

/**
 * @swagger
 * /api/catways/{id}:
 *  delete:
 *      summary: Supprime un Catway à partir de son numéro
 *      description: Supprime un Catway à partir de son numéro fourni dans le paramètre de chemin
 *      tags: [Catways]
 *      parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numéro du Catway à récupérer
 *         schema:
 *           type: number
 *      responses:
 *          202:
 *              description: Le Catway à été supprimé
 *          501: 
 *              description: Erreur serveur lors de la suppression du catway
 * 
 */
router.delete('/:id', privateAuth, catwayControllers.delete)

module.exports = router;