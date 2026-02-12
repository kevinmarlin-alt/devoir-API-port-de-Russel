var express = require('express');
var router = express.Router();

const userRoute = require('./users')
 

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'API Port de Russel' });
});

router.use('/users', userRoute)

module.exports = router;
