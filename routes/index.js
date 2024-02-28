const express = require('express');
const router = express.Router();

// const myController = require('../controllers');
// routes.get('/more', myController.returnAnotherPerson);

router.use('/', require('./swagger'));
router.use('/cars', require('./cars'));
router.use('/motorcycles', require('./motorcycles'));
// routes.use('/contacts', require('./contacts'));



module.exports = router;