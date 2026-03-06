const express = require('express');
const catwayControllers = require('../../controllers/catways.controllers')
const privateAuth = require('../../middlewares/authenticate')

const router = express.Router();

router.get('/all', privateAuth, catwayControllers.all)
router.get('/:id', privateAuth, catwayControllers.getById)
router.post('/', privateAuth, catwayControllers.add)
router.put('/:id', privateAuth, catwayControllers.updateOne)
router.delete('/:id', privateAuth, catwayControllers.delete)

module.exports = router;