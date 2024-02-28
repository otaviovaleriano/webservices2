const express = require('express');
const router = express.Router();
// const { requiresAuth } = require('express-openid-connect');

const motorcyclesController = require('../controllers/motorcycles');
const validation = require('../middleware/validate');

router.get('/', motorcyclesController.getAllMotorcycles);
router.get('/:id', motorcyclesController.getSingleMotorcycle);
router.post('/', validation.saveMotorcycle, motorcyclesController.createNewMotorcycle);
router.put('/:id', validation.saveMotorcycle, motorcyclesController.updateMotorcycle);
router.delete('/:id', motorcyclesController.deleteMotorcycle);

module.exports = router;