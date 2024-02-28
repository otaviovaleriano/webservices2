const express = require('express');
const router = express.Router();
const { requiresAuth } = require('express-openid-connect');

const motorcyclesController = require('../controllers/motorcycles');
const validation = require('../middleware/validate');

router.get('/', requiresAuth(), motorcyclesController.getAllMotorcycles);
router.get('/:id', requiresAuth(), motorcyclesController.getSingleMotorcycle);
router.post('/', requiresAuth(), validation.saveMotorcycle, motorcyclesController.createNewMotorcycle);
router.put('/:id', requiresAuth(), validation.saveMotorcycle, motorcyclesController.updateMotorcycle);
router.delete('/:id', requiresAuth(), motorcyclesController.deleteMotorcycle);

module.exports = router;