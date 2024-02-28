const express = require('express');
const router = express.Router();
const { requiresAuth } = require('express-openid-connect');

const carsController = require('../controllers/cars');
const validation = require('../middleware/validate');

router.get('/', requiresAuth(), carsController.getAllCars);
router.get('/:id', requiresAuth(), carsController.getSingleCar);
router.post('/', requiresAuth(), validation.saveCar, carsController.createNewCar);
router.put('/:id', requiresAuth(), validation.saveCar, carsController.updateCar);
router.delete('/:id', requiresAuth(), carsController.deleteCar);

module.exports = router;