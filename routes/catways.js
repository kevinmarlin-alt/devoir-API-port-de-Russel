const express = require('express');
const router = express.Router();

const catwayService = require('../services/catways')


router.get('/', catwayService.All)
//router.get('/:id', catwayService)
//router.post('/', catwayService)
//router.put('/:id', catwayService)
//router.delete('/:id', catwayService)

module.exports = router;