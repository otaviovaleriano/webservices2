const express = require('express');
const router = express.Router();

const carsController = require('../controllers/cars');

router.get('/', carsController.getAllCars);
router.post('/', carsController.createNewCar);

module.exports = router;