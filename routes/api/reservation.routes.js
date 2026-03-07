const express = require('express');
const reservationControllers = require('../../controllers/reservation.contollers')
const privateAuth = require('../../middlewares/authenticate')

const router = express.Router();

/**
 * @swagger
 * /api/catways/{id}/reservations:
 *  get:
 *      summary: Récupère la liste des reservations d'un Catway
 *      description: Récupère la liste des reservations d'un Catway à partir de son numéro fourni dans le paramètre de chemin
 *      tags: [Reservations]
 *      parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numéro du Catway à récupérer
 *         schema:
 *           type: number
 *      responses:
 *          200:
 *              description: Liste de l'ensemble des réservation du Catway sélectionné
 *              content:
 *                  application/json:
 *                    schema:
 *                      type: array
 *                      items:
 *                         $ref: '#/components/schemas/Catway'
 *          501: 
 *              description: Erreur serveur lors de la recherche de la liste des catways
 *      
 */
router.get('/:id/reservations', privateAuth, reservationControllers.all)

/**
 * @swagger
 * /api/catways/{id}/reservations/{idReservation}:
 *  get:
 *      summary: Récupère les détails d'une réservation d'un Catway
 *      description: Récupère les détails d'une réservation d'un Catway à partir de son numéro fourni dans le paramètre de chemin et du numéro du Catway
 *      tags: [Reservations]
 *      parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numéro du Catway à récupérer
 *         schema:
 *           type: number
 *       - in: path
 *         name: idReservation
 *         required: true
 *         description: Numéro de la réservation à récupérer
 *         schema:
 *           type: number
 *      responses:
 *          200:
 *              description: Liste de l'ensemble des réservation du Catway sélectionné
 *              content:
 *                  application/json:
 *                    schema:
 *                      type: array
 *                      items:
 *                         $ref: '#/components/schemas/Reservation'
 *          404: 
 *              description: Réservation non trouvée"
 *          501: 
 *              description: Erreur serveur lors de la récupération des informations
 *      
 */
router.get('/:id/reservations/:idReservation', privateAuth, reservationControllers.getById)

/**
 * @swagger
 * /api/catways/{id}/reservations:
 *  post:
 *      summary: Création d'une reservations d'un Catway
 *      description: Création d'une reservations d'un Catway à partir de son numéro fourni dans le paramètre de chemin
 *      tags: [Reservations]
 *      parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numéro du Catway à récupérer
 *         schema:
 *           type: number
 *      responses:
 *          200:
 *              description: Réservation enregistrée !
 *          501: 
 *              description: Erreur serveur lors de l'ajout de la réservation
 *      
 */
router.post('/:id/reservations', privateAuth, reservationControllers.add)

/**
 * @swagger
 * /api/catways/{id}/reservations/{idReservation}:
 *  put:
 *      summary: Mise à jour les détails d'une réservation d'un Catway
 *      description: Mise à jour les détails d'une réservation d'un Catway à partir de son numéro fourni dans le paramètre de chemin et du numéro du Catway
 *      tags: [Reservations]
 *      parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numéro du Catway à récupérer
 *         schema:
 *           type: number
 *       - in: path
 *         name: idReservation
 *         required: true
 *         description: Numéro de la réservation à récupérer
 *         schema:
 *           type: number
 *      responses:
 *          201:
 *              description: Modification de la réservation réussite !
 *          404: 
 *              description: Réservation non trouvée"
 *          501: 
 *              description: Erreur serveur lors de la mise à jour de la réservation
 *      
 */
router.put('/:id/reservations/:idReservation', privateAuth, reservationControllers.update)

/**
 * @swagger
 * /api/catways/{id}/reservations/{idReservation}:
 *  delete:
 *      summary: Suppression d'une réservation d'un Catway
 *      description: Suppression d'une réservation d'un Catway à partir de son numéro fourni dans le paramètre de chemin et du numéro du Catway
 *      tags: [Reservations]
 *      parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numéro du Catway à récupérer
 *         schema:
 *           type: number
 *       - in: path
 *         name: idReservation
 *         required: true
 *         description: Numéro de la réservation à récupérer
 *         schema:
 *           type: number
 *      responses:
 *          200:
 *              description: Suppression de la réservation réussite
 *          501: 
 *              description: Erreur serveur lors de la suppression de la réservation
 *      
 */
router.delete('/:id/reservations/:idReservation', privateAuth, reservationControllers.delete)

module.exports = router;