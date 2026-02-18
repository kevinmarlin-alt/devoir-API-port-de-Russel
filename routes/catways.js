const express = require('express');
const router = express.Router();

const catwayService = require('../services/catways')

router.get('/', catwayService.all)
router.get('/:id', catwayService.getById)
//router.post('/', catwayService)
router.put('/:id', catwayService.updateOne)
//router.delete('/:id', catwayService)

module.exports = router;