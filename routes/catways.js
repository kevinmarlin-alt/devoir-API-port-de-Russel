const express = require('express');
const router = express.Router();

const catwayService = require('../services/catways')
const private = require('../middlewares/authenticate')

router.get('/all', private, catwayService.all)
router.get('/:id', private, catwayService.getById)
router.post('/', private, catwayService.add)
router.put('/:id', private, catwayService.updateOne)
router.delete('/:id', private, catwayService.delete)

module.exports = router;