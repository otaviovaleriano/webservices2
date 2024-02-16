const express = require('express');
const router = express.Router();

const carsController = require('../controllers/cars');
const validation = require('../middleware/validate');

router.get('/', carsController.getAllCars);
router.get('/:id', carsController.getSingleCar);
router.post('/', validation.saveCar, carsController.createNewCar);
router.put('/:id', validation.saveCar, carsController.updateCar);
router.delete('/:id', carsController.deleteCar);

module.exports = router;