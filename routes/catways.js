const express = require('express');
const catwayService = require('../services/catways')
const privateAuth = require('../middlewares/authenticate')

const router = express.Router();

router.get('/all', privateAuth, catwayService.all)
router.get('/:id', privateAuth, catwayService.getById)
router.post('/', privateAuth, catwayService.add)
router.put('/:id', privateAuth, catwayService.updateOne)
router.delete('/:id', privateAuth, catwayService.delete)

module.exports = router;